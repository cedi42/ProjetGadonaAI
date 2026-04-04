import { useState, useRef, useEffect } from 'react'
import './Player.css'

export default function Player() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(70)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const intervalRef = useRef(null)
  const totalSecs = 222

  const formatTime = (s) => {
    return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0')
  }

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= totalSecs) {
            setPlaying(false)
            clearInterval(intervalRef.current)
            return prev
          }
          return prev + 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [playing])

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    setProgress(Math.round(pct * totalSecs))
  }

  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    setVolume(Math.round(pct * 100))
  }

  const handlePrev = () => setProgress(0)
  const handleNext = () => setProgress(0)

  return (
    <footer className="player">

      {/* LEFT — track info */}
      <div className="player-left">
        <div className="track-img">
          <MusicIcon />
        </div>
        <div className="track-info">
          <div className="track-title">Midnight Drive</div>
          <div className="track-artist">Nadia Soleil</div>
        </div>
      </div>

      {/* CENTER — controls + progress */}
      <div className="player-center">
        <div className="controls">
          <button
            className={`ctrl-btn ${shuffle ? 'active' : ''}`}
            onClick={() => setShuffle(!shuffle)}
          >
            <ShuffleIcon />
          </button>
          <button className="ctrl-btn" onClick={handlePrev}>
            <PrevIcon />
          </button>
          <button className="play-btn" onClick={() => setPlaying(!playing)}>
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button className="ctrl-btn" onClick={handleNext}>
            <NextIcon />
          </button>
          <button
            className={`ctrl-btn ${repeat ? 'active' : ''}`}
            onClick={() => setRepeat(!repeat)}
          >
            <RepeatIcon />
          </button>
        </div>

        <div className="progress-wrap">
          <span className="time">{formatTime(progress)}</span>
          <div className="progress-bar" onClick={handleProgressClick}>
            <div
              className="progress-fill"
              style={{ width: `${(progress / totalSecs) * 100}%` }}
            />
          </div>
          <span className="time right">{formatTime(totalSecs)}</span>
        </div>
      </div>

      {/* RIGHT — volume */}
      <div className="player-right">
        <button className="vol-btn">
          <VolumeIcon />
        </button>
        <div className="volume-bar" onClick={handleVolumeClick}>
          <div className="volume-fill" style={{ width: `${volume}%` }} />
        </div>
      </div>

    </footer>
  )
}

function MusicIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#444" strokeWidth="1.2"/>
      <circle cx="12" cy="12" r="3" fill="#444"/>
    </svg>
  )
}
function PlayIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="#000"><path d="M8 5v14l11-7z"/></svg>
}
function PauseIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="#000"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
}
function PrevIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
}
function NextIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zm2.5-6 6-4.25v8.5L8.5 12zM16 6h2v12h-2z"/></svg>
}
function ShuffleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M16 3h5v5M4 20l17-17M16 21h5v-5M4 4l6 6M14 14l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function RepeatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function VolumeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
    </svg>
  )
}