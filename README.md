# Sistema de Controle do Totem (Frontend)

Frontend em **Vite + React + TypeScript + Tailwind**.

## Rodar local

- `npm i`
- `npm run dev`

## Deploy na Vercel

### Opção 1 (mais simples): deploy pela raiz

- Framework: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`

### Opção 2: usar pasta `frontend/` como Root Directory

Se você quiser uma pasta dedicada só do frontend para apontar na Vercel, gere assim:

- `powershell -NoProfile -ExecutionPolicy Bypass -File .\\scripts\\prepare-frontend.ps1 -Destination frontend`

Depois, na Vercel:

- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
