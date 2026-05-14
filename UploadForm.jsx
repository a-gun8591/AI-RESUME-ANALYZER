import { useState } from "react"

function UploadForm({ onAnalyze, loading }) {
  const [file, setFile] = useState(null)
  const [jdText, setJdText] = useState("")

  const handleSubmit = () => {
    if (!file || !jdText.trim()) return
    onAnalyze({ file, jdText })
  }

  return (
    <div className="upload-form">
      <div className="field">
        <label>📋 Paste Job Description</label>
        <textarea
          rows={8}
          placeholder="Paste the full job description here..."
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
        />
      </div>

      <div className="field">
        <label>📄 Upload Your Resume (PDF)</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && <p className="file-name">✅ {file.name}</p>}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!file || !jdText.trim() || loading}
      >
        {loading ? "Analyzing..." : "Analyze My Resume →"}
      </button>
    </div>
  )
}

export default UploadForm