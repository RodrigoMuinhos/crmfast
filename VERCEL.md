# Deploy na Vercel (Frontend)

Este projeto é um **frontend Vite + React**. A Vercel consegue publicar direto.

## Opção A) Deploy via GitHub (recomendado)

1. Suba esta pasta (`Sistema de Controle do Totem`) para um repositório no GitHub.
2. Na Vercel: **Add New → Project** e selecione o repo.
3. Em **Framework Preset**, escolha **Vite** (geralmente auto-detecta).
4. Confirme as configs:
   - **Install Command**: `npm install`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Deploy.

## Opção B) Deploy por “Root Directory”

Se o repositório tiver outras pastas, na Vercel defina:

- **Root Directory**: a pasta do frontend (esta pasta)

## Observações

- O arquivo `vercel.json` já inclui rewrite para SPA (caso no futuro você use rotas no navegador).
- Rodar local:
  - `npm run dev`
- Testar build local:
  - `npm run build`
  - `npm run preview`
