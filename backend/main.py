from __future__ import annotations

import json
from copy import deepcopy
from datetime import date
from pathlib import Path
from typing import Any, Dict, List

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Career Guidance System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = Path(__file__).resolve().parent / "data"
DATA_FILE = DATA_DIR / "store.json"

DEFAULT_STORE: Dict[str, List[Dict[str, Any]]] = {
    "recommendations": [
        {
            "id": 1,
            "role": "Data Scientist",
            "match": 100,
            "salary": "₹18-25 LPA",
            "company": "Amazon",
            "skills": ["Python", "Machine Learning", "SQL", "TensorFlow", "Data Science"],
            "applyUrl": "https://www.linkedin.com/jobs/search/?keywords=Data%20Scientist%20Amazon%20Mumbai",
        },
        {
            "id": 5,
            "role": "Backend Developer",
            "match": 100,
            "salary": "₹14-22 LPA",
            "company": "Infosys",
            "skills": ["Java", "Spring", "SQL", "REST API", "microservices"],
            "applyUrl": "https://www.linkedin.com/jobs/search/?keywords=Backend%20Developer%20Infosys%20Bengaluru",
        },
        {
            "id": 2,
            "role": "Frontend Developer",
            "match": 80,
            "salary": "₹12-18 LPA",
            "company": "Microsoft",
            "skills": ["React", "JavaScript", "TypeScript", "CSS", "HTML"],
            "applyUrl": "https://www.linkedin.com/jobs/search/?keywords=Frontend%20Developer%20Microsoft%20India",
        },
        {
            "id": 6,
            "role": "DevOps Engineer",
            "match": 80,
            "salary": "₹14-22 LPA",
            "company": "Infosys",
            "skills": ["Docker", "Kubernetes", "AWS", "Linux", "CI/CD"],
            "applyUrl": "https://www.linkedin.com/jobs/search/?keywords=DevOps%20Engineer%20Infosys%20India",
        },
    ],
    "jobs": [
        {
            "id": 1,
            "role": "Data Scientist",
            "company": "Amazon",
            "location": "Mumbai, India",
            "salary": "₹18-25 LPA",
            "match": 100,
            "skills": ["Python", "Machine Learning", "SQL", "TensorFlow", "Data Science"],
            "applyUrl": "https://www.linkedin.com/jobs/search/?keywords=Data%20Scientist%20Amazon%20Mumbai",
            "recommended": True,
            "saved": False,
            "applied": False,
        },
        {
            "id": 2,
            "role": "Frontend Developer",
            "company": "TechCorp Inc.",
            "location": "Pune, India",
            "salary": "₹8-12 LPA",
            "match": 95,
            "skills": ["React", "JavaScript", "TypeScript", "CSS", "HTML"],
            "applyUrl": "https://www.linkedin.com/jobs/search/?keywords=Frontend%20Developer%20Pune%20India",
            "recommended": True,
            "saved": False,
            "applied": False,
        },
        {
            "id": 3,
            "role": "React Developer",
            "company": "StartupXYZ",
            "location": "Remote",
            "salary": "₹6-10 LPA",
            "match": 88,
            "skills": ["React", "Redux", "Tailwind"],
            "applyUrl": "https://www.linkedin.com/jobs/search/?keywords=React%20Developer%20Remote",
            "recommended": False,
            "saved": False,
            "applied": False,
        },
        {
            "id": 4,
            "role": "Full Stack Developer",
            "company": "InnovateLab",
            "location": "Hyderabad, India",
            "salary": "₹10-15 LPA",
            "match": 82,
            "skills": ["Node", "React", "MongoDB"],
            "applyUrl": "https://www.linkedin.com/jobs/search/?keywords=Full%20Stack%20Developer%20Hyderabad",
            "recommended": True,
            "saved": False,
            "applied": False,
        },
        {
            "id": 5,
            "role": "Backend Developer",
            "company": "Infosys",
            "location": "Bengaluru, India",
            "salary": "₹9-14 LPA",
            "match": 80,
            "skills": ["Java", "Spring", "REST API"],
            "applyUrl": "https://www.linkedin.com/jobs/search/?keywords=Backend%20Developer%20Infosys%20Bengaluru",
            "recommended": True,
            "saved": False,
            "applied": False,
        },
    ],
    "reports": [
        {
            "id": "r1",
            "title": "Career Analysis Report",
            "date": "2024-01-15",
            "size": "2.4 MB",
            "sections": ["Profile Summary", "Skill Assessment", "Career Recommendations", "Market Analysis", "Action Plan"],
        },
        {
            "id": "r2",
            "title": "Skill Gap Analysis",
            "date": "2024-01-10",
            "size": "1.8 MB",
            "sections": ["Current Skills", "Required Skills", "Learning Path", "Certification Recommendations", "Timeline"],
        },
    ],
}


def ensure_store() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not DATA_FILE.exists():
        DATA_FILE.write_text(json.dumps(DEFAULT_STORE, indent=2), encoding="utf-8")


def load_store() -> Dict[str, List[Dict[str, Any]]]:
    ensure_store()
    stored = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    return {
        "recommendations": stored.get("recommendations", deepcopy(DEFAULT_STORE["recommendations"])),
        "jobs": stored.get("jobs", deepcopy(DEFAULT_STORE["jobs"])),
        "reports": stored.get("reports", deepcopy(DEFAULT_STORE["reports"])),
    }


def save_store(store: Dict[str, List[Dict[str, Any]]]) -> None:
    DATA_FILE.write_text(json.dumps(store, indent=2), encoding="utf-8")


def update_store(section: str, data: List[Dict[str, Any]]) -> None:
    store = load_store()
    store[section] = data
    save_store(store)


@app.get("/health")
def health() -> Dict[str, str]:
    return {"status": "ok"}


@app.get("/api/recommendations")
def get_recommendations() -> List[Dict[str, Any]]:
    return load_store()["recommendations"]


@app.get("/api/jobs")
def get_jobs() -> List[Dict[str, Any]]:
    return load_store()["jobs"]


@app.post("/api/jobs/{job_id}/apply")
def apply_job(job_id: int) -> Dict[str, bool]:
    store = load_store()
    jobs = store["jobs"]
    matched = False
    updated_jobs = []
    for job in jobs:
        if job["id"] == job_id:
            updated_jobs.append({**job, "applied": True})
            matched = True
        else:
            updated_jobs.append(job)

    if not matched:
        raise HTTPException(status_code=404, detail="Job not found")

    update_store("jobs", updated_jobs)
    return {"success": True}


@app.post("/api/jobs/{job_id}/save")
def save_job(job_id: int) -> Dict[str, bool]:
    store = load_store()
    jobs = store["jobs"]
    matched = False
    updated_jobs = []
    for job in jobs:
        if job["id"] == job_id:
            updated_jobs.append({**job, "saved": not job["saved"]})
            matched = True
        else:
            updated_jobs.append(job)

    if not matched:
        raise HTTPException(status_code=404, detail="Job not found")

    update_store("jobs", updated_jobs)
    return {"success": True}


@app.get("/api/reports")
def get_reports() -> List[Dict[str, Any]]:
    return load_store()["reports"]


@app.post("/api/reports/generate")
def generate_report() -> Dict[str, Any]:
    store = load_store()
    reports = store["reports"]
    report = {
        "id": f"r-{len(reports) + 1}-{date.today().isoformat()}",
        "title": f"Generated Career Report {len(reports) + 1}",
        "date": date.today().isoformat(),
        "size": "2.0 MB",
        "sections": ["Summary", "Skills", "Recommendations", "Market", "Action Plan"],
    }
    reports.insert(0, report)
    update_store("reports", reports)
    return report


@app.post("/api/resume/upload")
async def upload_resume(resume: UploadFile = File(...)) -> Dict[str, Any]:
    return {
        "success": True,
        "filename": resume.filename,
        "analysis": {
            "score": 85,
            "strengths": ["React", "Node.js", "Problem Solving"],
            "missing": ["System Design"],
        },
    }