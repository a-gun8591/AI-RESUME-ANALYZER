# 🧠 AI Resume Analyzer

<div align="center">

![Python](https://img.shields.io/badge/Python-3.14+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-Backend-000000?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-24+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

**Paste a job description. Upload your resume. See exactly how well you match — and what to fix.**

</div>

---

## 📌 Overview

AI Resume Analyzer is a full-stack web app that compares your resume against a specific job description and returns a **weighted ATS compatibility score** with a full breakdown and actionable suggestions.

Unlike tools that just count keywords, this analyzer scores your resume across **4 real factors** — giving you a score that actually means something.

---

## 🎯 How the Scoring Works

The final score is a weighted combination of 4 factors:

| Factor | Weight | What It Checks |
|---|---|---|
| **Keyword Match** | 50% | How many JD keywords appear in your resume |
| **Resume Structure** | 20% | Presence of key sections (Experience, Skills, Education, Projects, etc.) |
| **Quantified Achievements** | 20% | Number of metrics and figures (e.g. "reduced by 40%", "team of 5") |
| **Action Verbs** | 10% | Strong opening verbs per bullet (Built, Led, Optimized, Delivered, etc.) |

This weighted approach means a resume can't score 100% just by stuffing keywords — it has to be well-structured and well-written too.

---

## ✨ Features

- 📋 **Job Description Input** — Paste any JD to get a role-specific analysis
- 📄 **PDF Resume Upload** — Extracts text directly from your resume PDF
- 🎯 **Weighted ATS Score** — A real percentage based on 4 scored factors
- 📊 **Score Breakdown** — Visual progress bars for each factor
- ✅ **Matched Keywords** — Keywords your resume already covers
- ❌ **Missing Keywords** — Exact words from the JD you're not using
- 💡 **Targeted Suggestions** — Specific advice per factor, not generic tips
- ⚡ **Instant Results** — No login, no signup, runs fully locally

---

## 📁 Project Structure

```
ai-resume-analyzer/
├── backend/
│   ├── app.py            # Flask server & /analyze API route
│   ├── analyzer.py       # 4-factor ATS scoring logic
│   └── requirements.txt  # flask, pdfplumber
└── frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx           # State management, API calls
        ├── App.css
        └── components/
            ├── UploadForm.jsx    # JD textarea + PDF upload
            ├── ScoreRing.jsx     # Animated circular score display
            └── Suggestions.jsx  # Breakdown bars + keywords + tips
```

---

## ⚙️ Prerequisites

- **Python 3.x** — [python.org/downloads](https://python.org/downloads)
  - ⚠️ Windows: tick **"Add Python to PATH"** during install
- **Node.js LTS** — [nodejs.org](https://nodejs.org)

Verify both are ready:
```bash
python --version
node --version
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2. Start the backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```
You should see: `Running on http://127.0.0.1:5000` ✅

### 3. Start the frontend
Open a **second terminal**:
```bash
cd frontend
npm install
npm run dev
```
You should see: `Local: http://localhost:5173` ✅

> ⚠️ Keep both terminals running while using the app.

Then open **http://localhost:5173** in your browser.

---

## 🔌 API

### `POST /analyze`

**Request** — `multipart/form-data`

| Field | Type | Description |
|---|---|---|
| `resume` | `file` | PDF resume |
| `jd_text` | `string` | Full job description text |

**Response**

```json
{
  "score": 72,
  "breakdown": {
    "keyword_match": 68,
    "resume_structure": 75,
    "quantified_achievements": 60,
    "action_verbs": 84
  },
  "matched_keywords": ["python", "flask", "api", "docker"],
  "missing_keywords": ["kubernetes", "ci/cd", "microservices"],
  "suggestions": [
    "📝 Moderate keyword match. Mirror the exact phrasing from the job description.",
    "📊 Add more measurable results. Numbers make your impact concrete.",
    "❌ Top missing keywords from JD: kubernetes, ci/cd, microservices"
  ]
}
```

---

## 📦 Dependencies

**Backend**
```
flask
flask-cors
pdfplumber
```

**Frontend**
```
react
vite
```

---

## 👤 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-linkedin)

---

<div align="center">
  <sub>Built with Python · Flask · pdfplumber · React · Vite</sub>
</div>
