from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .schemes import StudentInput
from .service import analyze_student


app = FastAPI(
    title="Academic Intelligence AI Service",
    description="AI-powered student academic performance and risk analysis",
    version="1.0.0"
)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# Health Check
# ==========================================

@app.get("/")
def root():
    return {
        "message": "Academic Intelligence AI Service is running",
        "status": "healthy",
        "version": "1.0.0"
    }


# ==========================================
# Health Endpoint
# ==========================================

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "academic-intelligence-ai"
    }


# ==========================================
# Student Analysis
# ==========================================

@app.post("/analyze")
def analyze(student: StudentInput):

    result = analyze_student(
        student.model_dump()
    )

    return result