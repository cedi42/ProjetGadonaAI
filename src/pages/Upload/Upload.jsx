import { useState } from 'react'
import './Upload.css'
import Player from '../../components/Player/Player'
import gadonaLogo from '../../assets/gadonaNO.png'
import { useNavigate } from 'react-router-dom'



const recommendations = [
  { id: 1, name: 'Nadia Soleil', listeners: '2.4M listeners', initials: 'NS' },
  { id: 2, name: 'Rex Malone', listeners: '1.1M listeners', initials: 'RM' },
  { id: 3, name: 'Yuki Tanaka', listeners: '890K listeners', initials: 'YT' },
  { id: 4, name: 'Luca Ferro', listeners: '3.2M listeners', initials: 'LF' },
  { id: 5, name: 'Amara Mbaye', listeners: '560K listeners', initials: 'AM' },
]

const stats = [
  { label: 'Écoutes', icon: <EarIcon /> },
  { label: 'Reposts', icon: <RepostIcon /> },
  { label: 'Téléchargements', icon: <DownloadIcon /> },
  { label: 'Likes', icon: <LikeIcon /> },
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
          <SearchIcon />
          <input type="text" placeholder="Rechercher un artiste, titre, album..." />
        </div>
      </header>

      <div className="body">

        {/* SIDEBAR GAUCHE */}
        <aside className="sidebar-left">
          <nav className="nav">
            <div className="nav-item" onClick={() => navigate('/home')}>
  <HomeIcon /> Home
</div>
<div className="nav-item" onClick={() => navigate('/library')}>
  <LibraryIcon /> Library
</div>
          </nav>

          <div className="sidebar-sep" />

          <div className="sidebar-bottom">
         <div className="nav-item" onClick={() => navigate('/generator')}>
  <BrainIcon /> Generator
</div>
<button className="upload-btn" onClick={() => navigate('/upload')}>
  <UploadIcon /> Upload
</button>
            <div className="account-wrap">
              <button
                className="account-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="avatar">CD</div>
                <span className="account-name">Mon compte</span>
                <ChevronIcon />
              </button>
              {dropdownOpen && (
                <div className="dropdown">
                  <div className="dropdown-item">Mon profil</div>
                  <div className="dropdown-item">Mes playlists</div>
                  <div className="dropdown-sep" />
                  <div className="dropdown-item">Paramètres</div>
                  <div className="dropdown-sep" />
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
                <UploadIcon />
              </div>
              <div className="upload-zone-title">Glissez vos fichiers ici</div>
              <div className="upload-zone-sub">MP3, WAV, FLAC — max 50 Mo par fichier</div>
              <button className="btn-choose">Choisir des fichiers</button>
            </div>
          </div>

        </main>

        {/* SIDEBAR DROITE */}
        <aside className="sidebar-right">
          <div className="sidebar-title">Recommendations</div>
          <div className="follow-list">
            {recommendations.map(artist => (
              <div className="follow-item" key={artist.id}>
                <div className="follow-avatar">{artist.initials}</div>
                <div className="follow-info">
                  <div className="follow-name">{artist.name}</div>
                  <div className="follow-listeners">{artist.listeners}</div>
                </div>
                <button
                  className={`btn-follow ${followed[artist.id] ? 'following' : ''}`}
                  onClick={() => toggleFollow(artist.id)}
                >
                  {followed[artist.id] ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
          </div>
        </aside>

      </div>
        <div className="player-container">
            <Player />
        </div>
    </div>
  )
}

// ICONS
function SearchIcon() {
  return <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="7" stroke="#555" strokeWidth="1.5"/><path d="M14 14l4 4" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/></svg>
}
function HomeIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
}
function LibraryIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
}
function UploadIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13v6H5v-6H3v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-2zM13 5.83l2.88 2.88 1.41-1.42L12 2 6.71 7.29l1.41 1.42L11 5.83V16h2V5.83z"/></svg>
}
function ChevronIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5-5 5 5z"/></svg>
}
function EarIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="#888"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
}
function RepostIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="#888"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>
}
function DownloadIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="#888"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
}
function LikeIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="#888"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
}
function BrainIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 0 2h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1 0-2h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/></svg>
}