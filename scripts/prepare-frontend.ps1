[CmdletBinding()]
param(
  [string]$Destination = "frontend"
)

$ErrorActionPreference = "Stop"

# Resolve repo root from this script location
$repoRoot = Split-Path -Parent $PSScriptRoot
$srcRoot = $repoRoot
$dstRoot = Join-Path $repoRoot $Destination

Write-Host "Preparing frontend folder:" -ForegroundColor Cyan
Write-Host "  Source:      $srcRoot"
Write-Host "  Destination: $dstRoot"

# Ensure destination exists
New-Item -ItemType Directory -Force -Path $dstRoot | Out-Null

$itemsToCopy = @(
  "index.html",
  "package.json",
  "package-lock.json",
  "postcss.config.mjs",
  "vite.config.ts",
  "README.md",
  "VERCEL.md",
  "vercel.json",
  "ATTRIBUTIONS.md",
  "src",
  "guidelines"
)

foreach ($item in $itemsToCopy) {
  $from = Join-Path $srcRoot $item
  $to = Join-Path $dstRoot $item

  if (-not (Test-Path $from)) {
    Write-Warning "Skipping missing: $item"
    continue
  }

  # If directory, copy recursively
  if ((Get-Item $from).PSIsContainer) {
    New-Item -ItemType Directory -Force -Path $to | Out-Null
    Copy-Item -Path (Join-Path $from "*") -Destination $to -Recurse -Force
  } else {
    Copy-Item -Path $from -Destination $to -Force
  }
}

# Ensure we don't bring build artifacts/deps along
foreach ($junk in @("node_modules", "dist")) {
  $junkPath = Join-Path $dstRoot $junk
  if (Test-Path $junkPath) {
    Remove-Item -Recurse -Force $junkPath
  }
}

# Provide a clean frontend README (optional)
$frontendReadme = Join-Path $dstRoot "README.frontend.md"
@"
# Frontend (Vite + React)

Esta pasta foi gerada para deploy na Vercel.

## Deploy na Vercel
- Root Directory: `$Destination`
- Build Command: `npm run build`
- Output Directory: `dist`

## Rodar local
- `npm i`
- `npm run dev`
"@ | Set-Content -Path $frontendReadme -Encoding UTF8

Write-Host "Done. Contents:" -ForegroundColor Green
Get-ChildItem -Force $dstRoot | Select-Object Name,Mode | Format-Table -AutoSize
