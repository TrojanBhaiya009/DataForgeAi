# AIP05 Startup Guide

This repository currently uses:

- Frontend: Next.js app in frontend
- Main backend: FastAPI app in backend-python
- Optional backend: Express app in backend

## One-time setup

From project root:

```bash
npm install
```

From frontend:

```bash
cd frontend
npm install
```

From backend-python:

```bash
cd backend-python
python -m venv venv
```

Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Mac/Linux:

```bash
source venv/bin/activate
pip install -r requirements.txt
```

## Start servers (recommended stack)

Open 2 terminals.

Terminal 1 (from project root, Next frontend):

```bash
npm run dev
```

Runs on: http://localhost:3000

Terminal 2 (from project root, FastAPI backend):

```bash
cd backend-python
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8000
```

Runs on: http://localhost:8000

## Optional: start Node backend instead of FastAPI

From project root:

```bash
npm run api:dev
```

Runs on: http://localhost:4000

Start Next frontend + Node backend together:

```bash
npm run dev:all
```

## Important notes

- npm run dev at root starts the new Next frontend in frontend.
- Old root static/Vite frontend has been removed.
