import { useState } from "react"
import UploadForm from "./components/UploadForm"
import ScoreRing from "./components/ScoreRing"
import Suggestions from "./components/Suggestions"
import "./App.css"

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAnalyze = async ({ file, jdText }) => {
    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append("resume", file)
    formData.append("jd_text", jdText)

    try {
      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Something went wrong")
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>🧠 AI Resume Analyzer</h1>
      <p className="subtitle">Paste a job description + upload your resume to see your match score.</p>
      <UploadForm onAnalyze={handleAnalyze} loading={loading} />
      {error && <p className="error">⚠️ {error}</p>}
      {result && (
        <div className="results">
          <ScoreRing score={result.score} />
          <Suggestions
  suggestions={result.suggestions}
  matched={result.matched_keywords}
  missing={result.missing_keywords}
  breakdown={result.breakdown}
/>
        </div>
      )}
    </div>
  )
}

export default App