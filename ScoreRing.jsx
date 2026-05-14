import { useEffect, useState } from 'react'

// Draws an animated SVG circle that fills up to the given score
export default function ScoreRing({ score, max = 100, label = 'Score' }) {
  const [displayed, setDisplayed] = useState(0)

  // useEffect runs after the component appears on screen
  // Here we use it to animate the number counting up
  useEffect(() => {
    let start = 0
    const step = Math.ceil(score / 40)  // finish in ~40 steps
    const timer = setInterval(() => {
      start += step
      if (start >= score) { setDisplayed(score); clearInterval(timer) }
      else setDisplayed(start)
    }, 20)
    return () => clearInterval(timer)  // cleanup on unmount
  }, [score])

  const radius      = 54
  const circumference = 2 * Math.PI * radius
  const fill        = ((score / max) * circumference)
  const color       = score >= 75 ? '#1D9E75' : score >= 50 ? '#EF9F27' : '#E24B4A'

  return (
    <div className="score-ring">
      <svg width="140" height="140" viewBox="0 0 140 140">
        {/* Background track */}
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        {/* Animated fill */}
        <circle
          cx="70" cy="70" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - fill}
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dashoffset 0.05s linear' }}
        />
        <text x="70" y="64" textAnchor="middle" fontSize="28" fontWeight="600" fill={color}>
          {displayed}
        </text>
        <text x="70" y="82" textAnchor="middle" fontSize="12" fill="#6b7280">
          / {max}
        </text>
      </svg>
      <p className="ring-label">{label}</p>
    </div>
  )
}
