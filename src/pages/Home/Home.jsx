import { useState } from 'react'
import '../../styles/global.css'
import './Home.css'
import Player from '../../components/Player/Player'
import gadonaLogo from '../../assets/gadonaNO.png'
import { useNavigate } from 'react-router-dom'
/* Icons */
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { BsStars } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";



const artists = [
  { id: 1, name: 'Nadia Soleil', genre: 'Afro Soul', initials: 'NS' },
  { id: 2, name: 'Rex Malone', genre: 'Hip-Hop', initials: 'RM' },
  { id: 3, name: 'Yuki Tanaka', genre: 'Indie Pop', initials: 'YT' },
  { id: 4, name: 'Luca Ferro', genre: 'Electronic', initials: 'LF' },
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
    <IoSearch size={16} />
    <input type="text" placeholder="Rechercher un artiste, titre, album..." />
  </div>

    
</header>

      <div className="body">

        {/* SIDEBAR GAUCHE */}
        <aside className="sidebar-left">
          <nav className="nav">
            <div className="nav-item" onClick={() => navigate('/home')}>
              <GoHomeFill size={16} />
              Home
            </div>
          </nav>

          <div className="sidebar-sep" />

          <div className="sidebar-bottom">
           <div className="nav-item" onClick={() => navigate('/generator')}>
  <BsStars /> Generator
</div>
<button className="upload-btn" onClick={() => navigate('/upload')}>
  <LuUpload size={16} /> Upload
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
          <div className="section-header">
            <span className="section-title">Artists to watch out for</span>
            <button className="btn-viewall">View all</button>
          </div>

          <div className="artists-grid">
            {artists.map(artist => (
              <div className="artist-card" key={artist.id}>
                <div className="artist-img">
                  <RxAvatar size={50} />
                </div>
                <div className="artist-info">
                  <div className="artist-name">{artist.name}</div>
                  <div className="artist-genre">{artist.genre}</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
        <div className="player-container">
            <Player />
        </div>
    </div>
  )
}