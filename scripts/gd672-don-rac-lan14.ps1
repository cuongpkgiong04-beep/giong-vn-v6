# GD 672 / C.423 (04/11/2026) - Don rac may LAN .14 (PC-PKT-01) - PA-3 DH chot
# Giu: 1 worker chuan (con service GIONG_SMED_Worker = 21304) + 1 icon tray (task GIONG_LAN_TRAY).
# Kill: ~180 python tray rac (lan_tray/tray_launcher*/run_tray/python -c) + worker thua PID 240 (task Boot cu).
# Disable: 9 task test GIONG_LAN_TRAY_* + GIONG_Tray (tray thu 2) + GIONG_Worker_LAN1 (task Boot cu - sinh worker thua).
# KHONG dong: service GIONG_SMED_Worker + con cmd 11744 + python 21304 (worker chuan).
$ErrorActionPreference = "Continue"

function Step($m) { Write-Host ("== " + $m) }

Step "1) Disable task test thu'a"
$testTasks = @("GIONG_LAN_TRAY_CAPTURE","GIONG_LAN_TRAY_DEBUG","GIONG_LAN_TRAY_DEBUG2","GIONG_LAN_TRAY_DEBUGFULL","GIONG_LAN_TRAY_ENVCHECK","GIONG_LAN_TRAY_PREVIEW_TEST","GIONG_LAN_TRAY_PYTEST","GIONG_LAN_TRAY_SITECHECK","GIONG_LAN_TRAY_TEST","GIONG_Tray","GIONG_Worker_LAN1")
foreach ($t in $testTasks) {
    try {
        schtasks /Change /TN $t /DISABLE | Out-Null
        Write-Host ("   DISABLED: " + $t)
    } catch { Write-Host ("   (bo qua) " + $t + ": " + $_.Exception.Message) }
}

Step "2) End + kill TAT CA python TRAY rac"
$trayPids = Get-CimInstance Win32_Process -Filter "Name like '%python%'" |
    Where-Object { $_.CommandLine -match "lan_tray|tray_launcher|run_tray" -or $_.CommandLine -like "*-c*import lan_tray*" }
$n = ($trayPids | Measure-Object).Count
Write-Host ("   Tim thay " + $n + " python tray rac - kill...")
foreach ($p in $trayPids) {
    try { Stop-Process -Id $p.ProcessId -Force -ErrorAction Stop } catch { }
}
Start-Sleep -Seconds 3
# kill lan cmd wrapper con sot (cmd chay tray bat)
Get-CimInstance Win32_Process -Filter "Name='cmd.exe'" |
    Where-Object { $_.CommandLine -match "lan_tray|tray_launcher|run_tray" } |
    ForEach-Object { try { Stop-Process -Id $_.ProcessId -Force -ErrorAction Stop } catch { } }

Step "3) Kill worker thua (task Boot cu) PID 240 + cmd 2240"
foreach ($pid_ in @(240, 2240)) {
    try {
        $p = Get-Process -Id $pid_ -ErrorAction SilentlyContinue
        if ($p) { Stop-Process -Id $pid_ -Force; Write-Host ("   KILLED " + $pid_) } else { Write-Host ("   (het roi) " + $pid_) }
    } catch { Write-Host ("   (loi) " + $pid_ + ": " + $_.Exception.Message) }
}

Step "4) Chay lai 1 tray chuan (GIONG_LAN_TRAY)"
schtasks /End /TN "GIONG_LAN_TRAY" 2>$null | Out-Null
schtasks /Run /TN "GIONG_LAN_TRAY" | Out-Null
Write-Host "   Da /run GIONG_LAN_TRAY"

Start-Sleep -Seconds 8
Step "5) VERIFY"
$py = Get-CimInstance Win32_Process -Filter "Name like '%python%'"
Write-Host ("   Tong python con lai: " + ($py | Measure-Object).Count)
$py | ForEach-Object { Write-Host ("   · PID " + $_.ProcessId + " | " + $_.CommandLine.Substring(0, [Math]::Min(110, $_.CommandLine.Length))) }
$w = Get-CimInstance Win32_Process -Filter "Name like '%python%'" | Where-Object { $_.CommandLine -like "*worker_node*" }
if ($w) { Write-Host ("   OK worker con song: " + (($w | ForEach-Object { $_.ProcessId }) -join ", ")) } else { Write-Host "   !! KHONG con worker - KIEM TRA SERVICE!" }
Write-Host "XONG"
