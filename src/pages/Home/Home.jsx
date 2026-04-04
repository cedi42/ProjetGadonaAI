import { useState } from 'react'
import './Home.css'
import Player from '../../components/Player/Player'
import gadonaLogo from '../../assets/gadonaNO.png'
import { useNavigate } from 'react-router-dom'

const artists = [
  { id: 1, name: 'Nadia Soleil', genre: 'Afro Soul', initials: 'NS' },
  { id: 2, name: 'Rex Malone', genre: 'Hip-Hop', initials: 'RM' },
  { id: 3, name: 'Yuki Tanaka', genre: 'Indie Pop', initials: 'YT' },
  { id: 4, name: 'Luca Ferro', genre: 'Electronic', initials: 'LF' },
]

const recommendations = [
  { id: 1, name: 'Nadia Soleil', listeners: '2.4M listeners', initials: 'NS' },
  { id: 2, name: 'Rex Malone', listeners: '1.1M listeners', initials: 'RM' },
  { id: 3, name: 'Yuki Tanaka', listeners: '890K listeners', initials: 'YT' },
  { id: 4, name: 'Luca Ferro', listeners: '3.2M listeners', initials: 'LF' },
  { id: 5, name: 'Amara Mbaye', listeners: '560K listeners', initials: 'AM' },
]

export default function Home() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('home')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [followed, setFollowed] = useState({})

  const toggleFollow = (id) => {
    setFollowed(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="page">

      {/* TOPBAR — barre de recherche seulement */}
 <header className="topbar">

  {/* LOGO */}
  <div className="topbar-left">
    <img src={gadonaLogo} alt="Gadona" className="topbar-logo" />
    <span className="topbar-title">Gadona AI</span>
  </div>

  {/* SEARCH */}
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
          <div className="section-header">
            <span className="section-title">Artists to watch out for</span>
            <button className="btn-viewall">View all</button>
          </div>

          <div className="artists-grid">
            {artists.map(artist => (
              <div className="artist-card" key={artist.id}>
                <div className="artist-img">
                  <AvatarIcon />
                </div>
                <div className="artist-info">
                  <div className="artist-name">{artist.name}</div>
                  <div className="artist-genre">{artist.genre}</div>
                </div>
              </div>
            ))}
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
function AvatarIcon() {
  return <svg width="40" height="40" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="18" r="10" fill="#fff" opacity="0.12"/><ellipse cx="24" cy="38" rx="16" ry="8" fill="#fff" opacity="0.12"/></svg>
}
function BrainIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 0 2h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1 0-2h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/></svg>
}