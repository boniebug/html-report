$location = "$env:USERPROFILE\path\tools"
$arch = "amd64"

if ([System.IntPtr]::Size -eq 4) {
  $arch = "386"
}

mkdir -p "$location" -ErrorAction SilentlyContinue
cd "$location"

Invoke-WebRequest "https://github.com/path-tw/artefacts/releases/download/v0.1.2/devsetup-v0.1.2-windows-$arch.exe" -OutFile argus.exe

Start-Process ".\argus.exe" -ArgumentList "setup" -Verb RunAs -Wait
