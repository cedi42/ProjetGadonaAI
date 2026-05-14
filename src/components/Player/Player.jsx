import { useState, useRef, useEffect } from 'react'
import './Player.css'

import { IoMusicalNotesSharp } from "react-icons/io5";
import { IoPlay } from "react-icons/io5";
import { IoPause } from "react-icons/io5";
import { IoPlaySkipBack } from "react-icons/io5";
import { IoPlaySkipForward } from "react-icons/io5";
import { IoRepeat } from "react-icons/io5";
import { LiaRandomSolid } from "react-icons/lia";
import { IoVolumeLow } from "react-icons/io5";

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
          <div className="track-img"><IoMusicalNotesSharp /></div>
          <div>
            <div className="track-title">Midnight Drive</div>
            <div className="track-artist">Nadia Soleil</div>
          </div>
        </div>

        <div className="player-center">
          <div className="controls">
            <button className={`ctrl-btn ${shuffle ? 'active' : ''}`} onClick={() => setShuffle(!shuffle)}>
              <LiaRandomSolid />
            </button>
            <button className="ctrl-btn" onClick={() => setProgress(0)}>
              <IoPlaySkipBack />
            </button>
            <button className="play-btn" onClick={() => setPlaying(!playing)}>
              {playing ? <IoPause /> : <IoPlay />}
            </button>
            <button className="ctrl-btn" onClick={() => setProgress(0)}>
              <IoPlaySkipForward />
            </button>
            <button className={`ctrl-btn ${repeat ? 'active' : ''}`} onClick={() => setRepeat(!repeat)}>
              <IoRepeat />
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
          <IoVolumeLow />
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
          <div className="panel-cover"><IoMusicalNotesSharp size={100} /></div>

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
                <LiaRandomSolid size={30} />
              </button>
              <button className="panel-ctrl" onClick={() => setProgress(0)}>
                <IoPlaySkipBack size={30} />
              </button>
              <button className="panel-play" onClick={() => setPlaying(!playing)}>
                {playing ? <IoPause size={25} /> : <IoPlay size={25} />}
              </button>
              <button className="panel-ctrl" onClick={() => setProgress(0)}>
                <IoPlaySkipForward size={30}/>
              </button>
              <button className={`panel-ctrl ${repeat ? 'active' : ''}`} onClick={() => setRepeat(!repeat)}>
                <IoRepeat size={30} />
              </button>
            </div>

            <div className="panel-vol">
              <IoVolumeLow size={25} />
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
function VolumeIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="#888"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
}