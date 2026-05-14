import { useState, useRef } from 'react'
import '../../styles/global.css'
import './Generatox.css'
import Player from '../../components/Player/Player'
import gadonaLogo from '../../assets/gadonaNO.png'
import { useNavigate } from 'react-router-dom'

import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { BsStars } from "react-icons/bs";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { IoCheckmarkSharp } from "react-icons/io5";

/*const recommendations = [
  { id: 1, name: 'Nadia Soleil', listeners: '2.4M listeners', initials: 'NS' },
  { id: 2, name: 'Rex Malone', listeners: '1.1M listeners', initials: 'RM' },
  { id: 3, name: 'Yuki Tanaka', listeners: '890K listeners', initials: 'YT' },
  { id: 4, name: 'Luca Ferro', listeners: '3.2M listeners', initials: 'LF' },
  { id: 5, name: 'Amara Mbaye', listeners: '560K listeners', initials: 'AM' },
]*/

const hints = [
  'Beat trap mélancolique avec piano et cordes',
  'Afrobeats énergique avec percussions et cuivres',
  'Lo-fi chill pour étudier, ambiance cosy',
  'Electronic dark avec synthés et basse lourde',
  'Jazz moderne avec saxophone et contrebasse',
]

const loadingLabels = [
  'Analyse du prompt...',
  'Composition en cours...',
  'Arrangement des instruments...',
  'Mixage final...',
  'Finalisation...',
]

export default function Generator() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('generator')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [followed, setFollowed] = useState({})
  const [prompt, setPrompt] = useState('')
  const [genre, setGenre] = useState('Hip-Hop / Trap')
  const [mood, setMood] = useState('Sombre / Mélancolique')
  const [duration, setDuration] = useState('2 minutes')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [genCount, setGenCount] = useState(0)
  const [loadingLabel, setLoadingLabel] = useState('')
  const intervalRef = useRef(null)

  const toggleFollow = (id) => {
    setFollowed(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const generate = () => {
    setLoading(true)
    setResult(null)
    let i = 0
    setLoadingLabel(loadingLabels[0])
    intervalRef.current = setInterval(() => {
      i++
      if (i < loadingLabels.length) {
        setLoadingLabel(loadingLabels[i])
      }
    }, 500)
    setTimeout(() => {
      clearInterval(intervalRef.current)
      setLoading(false)
      setGenCount(prev => prev + 1)
      setResult({
        name: prompt.trim() ? prompt.substring(0, 30) : genre,
        meta: `Gadona AI • 2025 • ${duration}`,
      })
    }, 2800)
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
                <GoHomeFill size={16} /> Home
           </div>
          </nav>

          <div className="sidebar-sep" />

          <div className="sidebar-bottom">
            <div className="nav-item" onClick={() => navigate('/generator')}>
  <BsStars />Generator
</div>
<button className="upload-btn" onClick={() => navigate('/upload')}>
  <LuUpload size={16} /> Upload
</button>
            <div className="account-wrap">
              <button className="account-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
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

        {/* MAIN */}
        <main className="main">

          <div className="gen-header">
            <div className="gen-title">Générateur de musique</div>
            <div className="gen-sub">Décrivez la musique que vous voulez créer, l'IA s'occupe du reste.</div>
          </div>

          {/* PROMPT BLOCK */}
          <div className="block">
            <div className="ai-badge-wrap">
              <div className="ai-badge">
                <div className="ai-dot" />
                Gadona AI
              </div>
              <span className="ai-label">Propulsé par l'intelligence artificielle</span>
            </div>

            <textarea
              className="prompt-area"
              placeholder="Ex : Un beat hip-hop sombre avec une ligne de basse profonde, des hi-hats rapides et une ambiance nocturne urbaine..."
              maxLength={300}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <div className="prompt-hints">
              {hints.map((h, i) => (
                <div key={i} className="hint" onClick={() => setPrompt(h)}>
                  {h.length > 22 ? h.substring(0, 22) + '...' : h}
                </div>
              ))}
            </div>

            <div className="params-grid">
              <div className="param-card">
                <div className="param-label">Genre</div>
                <select className="param-select" value={genre} onChange={e => setGenre(e.target.value)}>
                  <option>Hip-Hop / Trap</option>
                  <option>Afrobeats</option>
                  <option>Electronic</option>
                  <option>Lo-fi</option>
                  <option>Jazz</option>
                  <option>R&B / Soul</option>
                  <option>Pop</option>
                </select>
              </div>
              <div className="param-card">
                <div className="param-label">Ambiance</div>
                <select className="param-select" value={mood} onChange={e => setMood(e.target.value)}>
                  <option>Sombre / Mélancolique</option>
                  <option>Énergique / Festif</option>
                  <option>Chill / Relaxant</option>
                  <option>Romantique</option>
                  <option>Mystérieux</option>
                  <option>Épique</option>
                </select>
              </div>
              <div className="param-card">
                <div className="param-label">Durée</div>
                <select className="param-select" value={duration} onChange={e => setDuration(e.target.value)}>
                  <option>30 secondes</option>
                  <option>1 minute</option>
                  <option>2 minutes</option>
                  <option>3 minutes</option>
                  <option>4 minutes +</option>
                </select>
              </div>
            </div>

            <div className="gen-btn-wrap">
              <button className="gen-btn" onClick={generate} disabled={loading}>
                <BsStars /> {loading ? 'Génération...' : 'Générer la musique'}
              </button>
              <span className="char-count">{prompt.length} / 300</span>
            </div>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="block loading-block">
              <div className="loading-bar">
                <div className="loading-fill" />
              </div>
              <div className="loading-label">{loadingLabel}</div>
            </div>
          )}

          {/* RESULT */}
          {result && !loading && (
            <div className="block">
              <div className="result-title">
                <IoCheckmarkSharp /> Morceau généré
              </div>
              <div className="result-track">
                <div className="result-cover">
                  <IoMusicalNotesSharp />
                </div>
                <div className="result-info">
                  <div className="result-name">{result.name}</div>
                  <div className="result-meta">{result.meta}</div>
                </div>
                <div className="result-actions">
                  <button className="rbtn" onClick={generate}>Regénérer</button>
                  <button className="rbtn primary">Télécharger</button>
                  <button className="rbtn danger" onClick={() => setResult(null)}>Supprimer</button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
      <div className="player-container">
            <Player />
      </div>
    </div>
  )
}
