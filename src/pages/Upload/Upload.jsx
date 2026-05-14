import { useState } from 'react'
import '../../styles/global.css'
import './Upload.css'
import Player from '../../components/Player/Player'
import gadonaLogo from '../../assets/gadonaNO.png'
import { useNavigate } from 'react-router-dom'

import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { BsStars } from "react-icons/bs";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { IoEyeSharp } from "react-icons/io5";
import { BiRepost } from "react-icons/bi";
import { IoDownloadOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";

const stats = [
  { label: 'Écoutes', icon: <IoEyeSharp /> },
  { label: 'Reposts', icon: <BiRepost /> },
  { label: 'Téléchargements', icon: <IoDownloadOutline /> },
  { label: 'Likes', icon: <IoHeartSharp /> },
]

export default function Upload() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('upload')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [followed, setFollowed] = useState({})
  const [dragging, setDragging] = useState(false)

  const toggleFollow = (id) => {
    setFollowed(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="page">

      {/* TOPBAR */}
      <header className="topbar">
        <div className="topbar-left">
          <img src={gadonaLogo} alt="Gadona" className="topbar-logo" />
          <span className="topbar-title">Gadona AI</span>
        </div>
        <div className="search-bar">
          <IoSearch size={16} />
          <input type="text" placeholder="Rechercher un artiste, titre, album..." />
        </div>
      </header>

      <div className="body">

        {/* SIDEBAR GAUCHE */}
        <aside className="sidebar-left">
          <nav className="nav">
            <div className="nav-item" onClick={() => navigate('/home')}>
  <GoHomeFill size={16}/> Home
</div>
          </nav>

          <div className="sidebar-sep" />

          <div className="sidebar-bottom">
         <div className="nav-item" onClick={() => navigate('/generator')}>
  <BsStars /> Generator
</div>
<button className="upload-btn" onClick={() => navigate('/upload')}>
  <LuUpload size={16}/> Upload
</button>
            <div className="account-wrap">
              <button
                className="account-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="avatar">CD</div>
                <span className="account-name">Mon compte</span>
                <PiDotsThreeOutlineVerticalBold />
              </button>
              {dropdownOpen && (
                <div className="dropdown">
                  <div className="dropdown-item">Mon profil</div>
                  <div className="dropdown-item logout">Se déconnecter</div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="main">

          {/* BLOC 1 — STOCKAGE */}
          <div className="block">
            <div className="block-title">Stockage utilisé</div>
            <div className="storage-info">
              <span className="storage-label">0 Mo utilisé sur 2 Go</span>
              <span className="storage-pct">0%</span>
            </div>
            <div className="storage-bar">
              <div className="storage-fill" style={{ width: '0%' }} />
            </div>
            <div className="storage-sub">Aucun fichier uploadé pour le moment</div>
          </div>

          {/* BLOC 2 — STUDIO STATS */}
          <div className="block">
            <div className="block-title">Studio de l'artiste</div>
            <div className="stats-grid">
              {stats.map((s, i) => (
                <div className="stat-card" key={i}>
                  <div className="stat-icon">{s.icon}</div>
                  <div className="stat-value">0</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* BLOC 3 — TITRES GADONA */}
          <div className="block">
            <div className="block-title">Titres Gadona</div>

            <div
              className={`upload-zone ${dragging ? 'dragging' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false) }}
            >
              <div className="upload-icon-wrap">
                <LuUpload size={16} />
              </div>
              <div className="upload-zone-title">Glissez vos fichiers ici</div>
              <div className="upload-zone-sub">MP3, WAV, FLAC — max 50 Mo par fichier</div>
              <button className="btn-choose">Choisir des fichiers</button>
            </div>
          </div>

        </main>

      </div>
        <div className="player-container">
            <Player />
        </div>
    </div>
  )
}