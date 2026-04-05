import { useState, useRef, useEffect } from 'react'
import './Player.css'

export default function Player() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(70)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const intervalRef = useRef(null)
  const totalSecs = 222

  const fmt = (s) => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0')

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= totalSecs) { setPlaying(false); return prev }
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
    setProgress(Math.round(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * totalSecs))
  }

  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setVolume(Math.round(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * 100))
  }

  const pct = (progress / totalSecs) * 100

  return (
    <>
      {/* MINI PLAYER */}
      <footer className="player">
        <div className="player-left" onClick={() => setPanelOpen(true)}>
          <div className="track-img"><MusicIcon /></div>
          <div>
            <div className="track-title">Midnight Drive</div>
            <div className="track-artist">Nadia Soleil</div>
          </div>
        </div>

        <div className="player-center">
          <div className="controls">
            <button className={`ctrl-btn ${shuffle ? 'active' : ''}`} onClick={() => setShuffle(!shuffle)}>
              <ShuffleIcon />
            </button>
            <button className="ctrl-btn" onClick={() => setProgress(0)}>
              <PrevIcon />
            </button>
            <button className="play-btn" onClick={() => setPlaying(!playing)}>
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button className="ctrl-btn" onClick={() => setProgress(0)}>
              <NextIcon />
            </button>
            <button className={`ctrl-btn ${repeat ? 'active' : ''}`} onClick={() => setRepeat(!repeat)}>
              <RepeatIcon />
            </button>
          </div>
          <div className="progress-wrap">
            <span className="time">{fmt(progress)}</span>
            <div className="progress-bar" onClick={handleProgressClick}>
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="time right">{fmt(totalSecs)}</span>
          </div>
        </div>

        <div className="player-right">
          <VolumeIcon />
          <div className="volume-bar" onClick={handleVolumeClick}>
            <div className="volume-fill" style={{ width: `${volume}%` }} />
          </div>
        </div>
      </footer>

      {/* OVERLAY */}
      {panelOpen && (
        <div className="panel-overlay" onClick={() => setPanelOpen(false)} />
      )}

      {/* PANEL */}
      <div className={`player-panel ${panelOpen ? 'open' : ''}`}>
        <div className="panel-handle" onClick={() => setPanelOpen(false)}>
          <div className="handle-bar" />
        </div>

        <div className="panel-header">
          <span className="panel-header-label">En cours de lecture</span>
          <button className="panel-close" onClick={() => setPanelOpen(false)}>×</button>
        </div>

        <div className="panel-body">
          <div className="panel-cover"><MusicIconLarge /></div>

          <div className="panel-track-info">
            <div className="panel-track-name">Midnight Drive</div>
            <div className="panel-track-artist">Nadia Soleil</div>
          </div>

          <div className="panel-controls">
            <div className="panel-progress">
              <span className="panel-time">{fmt(progress)}</span>
              <div className="panel-pbar" onClick={handleProgressClick}>
                <div className="panel-pfill" style={{ width: `${pct}%` }} />
              </div>
              <span className="panel-time right">{fmt(totalSecs)}</span>
            </div>

            <div className="panel-btns">
              <button className={`panel-ctrl ${shuffle ? 'active' : ''}`} onClick={() => setShuffle(!shuffle)}>
                <ShuffleIcon />
              </button>
              <button className="panel-ctrl" onClick={() => setProgress(0)}>
                <PrevIconLg />
              </button>
              <button className="panel-play" onClick={() => setPlaying(!playing)}>
                {playing ? <PauseIconLg /> : <PlayIconLg />}
              </button>
              <button className="panel-ctrl" onClick={() => setProgress(0)}>
                <NextIconLg />
              </button>
              <button className={`panel-ctrl ${repeat ? 'active' : ''}`} onClick={() => setRepeat(!repeat)}>
                <RepeatIcon />
              </button>
            </div>

            <div className="panel-vol">
              <VolumeIcon />
              <div className="panel-vbar" onClick={handleVolumeClick}>
                <div className="panel-vfill" style={{ width: `${volume}%` }} />
              </div>
            </div>
          </div>

          <div className="panel-actions">
            <button className="action-btn">+ Playlist</button>
            <button className="action-btn">Partager</button>
            <button className="action-btn">Voir l'artiste</button>
            <button className="action-btn">❤ Like</button>
          </div>
        </div>
      </div>
    </>
  )
}

// ICONS
function MusicIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#444" strokeWidth="1.2"/><circle cx="12" cy="12" r="3" fill="#444"/></svg>
}
function MusicIconLarge() {
  return <svg width="64" height="64" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#333" strokeWidth="0.8"/><circle cx="12" cy="12" r="4" stroke="#444" strokeWidth="0.8"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#333" strokeWidth="0.8" strokeLinecap="round"/></svg>
}
function PlayIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="#000"><path d="M8 5v14l11-7z"/></svg>
}
function PauseIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="#000"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
}
function PlayIconLg() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="#000"><path d="M8 5v14l11-7z"/></svg>
}
function PauseIconLg() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="#000"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
}
function PrevIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
}
function NextIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zm2.5-6 6-4.25v8.5L8.5 12zM16 6h2v12h-2z"/></svg>
}
function PrevIconLg() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
}
function NextIconLg() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zm2.5-6 6-4.25v8.5L8.5 12zM16 6h2v12h-2z"/></svg>
}
function ShuffleIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M16 3h5v5M4 20l17-17M16 21h5v-5M4 4l6 6M14 14l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function RepeatIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function VolumeIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="#888"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
}