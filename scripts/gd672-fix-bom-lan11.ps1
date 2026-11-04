# GD 672 / C.423 (04/11/2026) - Sua goc re "thang ma" tren .11 (THANH-PC):
# worker.env.bat co UTF-8 BOM -> cmd doc dong 1 thanh bien rac
# "i»¿SMED_INTERNAL_API_URL" -> SMED_INTERNAL_API_URL KHONG duoc set
# -> worker_node claim qua VERCEL /api/agent/claim (route cu khong set claimed_by)
# -> nhan job sqlreport -> builder .\SQLEXPRESS tren .11 (khong co SQL Server) -> 08001.
# Fix: bo BOM file bat + kill worker phi env + chay lai worker dung env.
$ErrorActionPreference = "Continue"

$f = "C:\CUONG_2026\giong-agent\worker.env.bat"
$bytes = [System.IO.File]::ReadAllBytes($f)
if ($bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    Write-Host "BOM tim thay - dang xoa BOM (3 byte dau)..."
    [System.IO.File]::WriteAllBytes($f, $bytes[3..($bytes.Length - 1)])
    Write-Host "DA XOA BOM."
} else {
    Write-Host "File khong co BOM (khong sua)"
}

# Kiem tra dong 1 sau khi sua
$first = (Get-Content $f -TotalCount 1)
Write-Host ("Dong 1 hien tai: " + $first)

# Kill worker phi env (9092) + cmd wrapper (6916)
foreach ($pid_ in @(9092, 6916)) {
    try {
        if (Get-Process -Id $pid_ -ErrorAction SilentlyContinue) {
            Stop-Process -Id $pid_ -Force
            Write-Host ("KILLED " + $pid_)
        } else { Write-Host ("(het roi) " + $pid_) }
    } catch { Write-Host ("(loi) " + $pid_ + ": " + $_.Exception.Message) }
}
Start-Sleep -Seconds 3

# Restart worker dung env: NSSM service GIONG_SMED_Worker dang chay con nhanh
# (con service da chet khi kill 9092/6916 neu do la con service; NSSM tu restart).
# Doi 8 giay roi kiem tra python worker moi + cmdline.
Start-Sleep -Seconds 8
$svc = Get-CimInstance Win32_Service -Filter "Name='GIONG_SMED_Worker'"
Write-Host ("Service GIONG_SMED_Worker: " + $svc.State + " (PID " + $svc.ProcessId + ")")
Get-CimInstance Win32_Process -Filter "Name like '%python%'" |
    Where-Object { $_.CommandLine -like "*worker_node*" } |
    ForEach-Object { Write-Host ("  worker: PID " + $_.ProcessId + " | " + $_.CommandLine.Substring(0, [Math]::Min(80, $_.CommandLine.Length))) }
Write-Host "XONG - kiem tra log api_server phai co [agent] claim ... worker=thanh-pc, va Vercel logs HET POST /api/agent/claim"
