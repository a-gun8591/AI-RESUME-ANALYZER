function Suggestions({ suggestions, matched, missing, breakdown }) {
  const breakdownItems = [
    { label: "Keyword Match", key: "keyword_match", weight: "50%" },
    { label: "Resume Structure", key: "resume_structure", weight: "20%" },
    { label: "Quantified Achievements", key: "quantified_achievements", weight: "20%" },
    { label: "Action Verbs", key: "action_verbs", weight: "10%" },
  ]

  const getColor = (score) => {
    if (score >= 70) return "#16a34a"
    if (score >= 40) return "#d97706"
    return "#dc2626"
  }

  return (
    <div className="suggestions">

      {breakdown && (
        <div className="section">
          <h3>📊 Score Breakdown</h3>
          {breakdownItems.map(({ label, key, weight }) => (
            <div key={key} className="breakdown-row">
              <div className="breakdown-header">
                <span className="breakdown-label">{label}</span>
                <span className="breakdown-score" style={{ color: getColor(breakdown[key]) }}>
                  {breakdown[key]}% <small>({weight})</small>
                </span>
              </div>
              <div className="bar-bg">
                <div
                  className="bar-fill"
                  style={{ width: `${breakdown[key]}%`, background: getColor(breakdown[key]) }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="section">
        <h3>💡 Suggestions</h3>
        <ul>
          {suggestions.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>

      {missing.length > 0 && (
        <div className="section">
          <h3>❌ Missing Keywords <span className="count">{missing.length}</span></h3>
          <div className="keywords">
            {missing.map((k, i) => (
              <span key={i} className="keyword missing">{k}</span>
            ))}
          </div>
        </div>
      )}

      {matched.length > 0 && (
        <div className="section">
          <h3>✅ Matched Keywords <span className="count">{matched.length}</span></h3>
          <div className="keywords">
            {matched.map((k, i) => (
              <span key={i} className="keyword matched">{k}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Suggestions