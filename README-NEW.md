# AIP05 - Automated Data Grounding for LLMs

Transform scattered PDFs, reports, URLs, and documentation into structured, high-quality datasets for fine-tuning domain-specific large language models.

## Project Structure

```
AIP05/
├── frontend/          # Next.js 14 frontend
│   ├── app/           # App Router pages
│   ├── components/    # Reusable components
│   └── lib/           # API client & utilities
├── backend-python/    # FastAPI backend
│   ├── app/
│   │   ├── routes/    # API endpoints
│   │   └── ml/        # ML model integration
│   └── requirements.txt
└── README.md
```

## Quick Start

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Opens at http://localhost:3000

### Backend (FastAPI)

```bash
cd backend-python

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app.main:app --reload --port 8000
```

API docs at http://localhost:8000/docs

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Hero, features, how it works |
| Upload | `/upload` | Drag-drop file upload |
| Dashboard | `/dashboard` | View processing jobs |
| Results | `/results/[id]` | View extracted data |
| Docs | `/docs` | API documentation |
| Pricing | `/pricing` | Pricing plans |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/upload` | Upload file |
| POST | `/api/process/url` | Process URL |
| GET | `/api/jobs` | List jobs |
| GET | `/api/jobs/{id}` | Get job details |
| DELETE | `/api/jobs/{id}` | Delete job |
| POST | `/api/inference` | ML inference |

## ML Model Integration

When your ML model is ready:

1. Edit `backend-python/app/ml/model.py`
2. Load model in `ModelAdapter.__init__()`
3. Implement `ModelAdapter.process()` 
4. Add dependencies to `requirements.txt`

Example:
```python
class ModelAdapter:
    def __init__(self):
        self.model = YourModel.load("path/to/model")
        self._loaded = True
    
    def process(self, text, context=None):
        result = self.model.predict(text)
        return {
            "summary": result.summary,
            "entities": result.entities,
            "confidence": result.confidence
        }
```

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.11+
- **Styling**: Dark theme with zinc color palette
