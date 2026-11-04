# GD 670 / C.421 (04/11/2026) - Fix NSSM GIONG_SMED_Agent missing AppEnvironment:
# con 40_web_agent started without env -> URL_CLAIM fell back to Vercel /api/agent/claim
# (old route without claimed_by) -> ran builder in service env -> sqlreport jobs errored
# (08001) with empty claimed_by. Set AppEnvironment (REG_MULTI_SZ, one var per element)
# then restart service (only GIONG_SMED_Agent; api_server/tunnel untouched).
# Usage: powershell -ExecutionPolicy Bypass -File scripts/gd670-fix-nssm-env-agent.ps1

$ErrorActionPreference = "Stop"

$envFile = Join-Path $PSScriptRoot "..\.secrets\agent-env-nssm.txt"
if (-not (Test-Path $envFile)) {
    Write-Host "MISSING $envFile - create it with lines VAR=value:"
    Write-Host "   SMED_AGENT_TOKEN=<token>"
    Write-Host "   SMED_INTERNAL_API_URL=http://127.0.0.1:8777"
    Write-Host "   AGENT_SQL_CONN=Driver={ODBC Driver 18 for SQL Server};Server=.\SQLEXPRESS;Database=GiongDB;Uid=giong_worker;Pwd=<pass>;Encrypt=no;TrustServerCertificate=yes;"
    Write-Host "   ETL_SQL_CONN=<same as AGENT_SQL_CONN>"
    exit 1
}

$vars = @(Get-Content $envFile | Where-Object { $_.Trim() -and -not $_.StartsWith("#") })
if ($vars.Count -lt 3) { Write-Host "ENV FILE TOO FEW VARS (need >= 3)"; exit 1 }

Write-Host "Will set $($vars.Count) AppEnvironment vars for GIONG_SMED_Agent:"
$vars | ForEach-Object { $name = ($_ -split "=", 2)[0]; Write-Host "   · $name" }

& C:\nssm\nssm.exe set GIONG_SMED_Agent AppEnvironment @vars | Out-Null
if ($LASTEXITCODE -ne 0) { Write-Host "nssm set AppEnvironment FAILED"; exit 1 }

$ae = Get-Item "HKLM:\SYSTEM\CurrentControlSet\Services\GIONG_SMED_Agent\Parameters\AppEnvironment" -ErrorAction Stop
$names = @($ae.GetValueNames())
Write-Host "AppEnvironment now has $($names.Count) elements:"
$names | ForEach-Object { Write-Host "   · $_" }
if ($names.Count -ne $vars.Count) {
    Write-Host "ELEMENT COUNT MISMATCH - ABORT (service NOT restarted)"
    exit 1
}

# Bash pitfall: backslash turned into forward slash -> SQL Server path wrong
$ae.GetValueNames() | ForEach-Object {
    if ($_ -like "*SQL_CONN*" -and $ae.GetValue($_) -match "Server=./SQLEXPRESS") {
        Write-Host "Server=./SQLEXPRESS (forward slash) WRONG - must be .\SQLEXPRESS - fix env file and rerun"
        exit 1
    }
}

Write-Host ""
Write-Host "Step 2 - restart service (only GIONG_SMED_Agent; api_server/tunnel untouched):"
Restart-Service -Name "GIONG_SMED_Agent" -Force
Start-Sleep -Seconds 5
$st = Get-Service -Name "GIONG_SMED_Agent"
Write-Host "   Service status: $($st.Status)"

Start-Sleep -Seconds 5
$py = Get-CimInstance Win32_Process -Filter "Name like '%python%'" |
    Where-Object { $_.CommandLine -like "*40_web_agent.py*" }
if ($py) {
    $py | ForEach-Object { Write-Host "   OK 40_web_agent running: PID $($_.ProcessId) · started $($_.CreationDate)" }
} else {
    Write-Host "   WARN no 40_web_agent process yet - check service LOG"
}
Write-Host "DONE - newest LOG/web_agent_*.log must say 'poll http://127.0.0.1:8777/agent/claim'"
