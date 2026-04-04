import { useState, useRef } from 'react'
import './Generatox.css'
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
              <button className="account-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
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
                <BrainIcon /> {loading ? 'Génération...' : 'Générer la musique'}
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
                <CheckIcon /> Morceau généré
              </div>
              <div className="result-track">
                <div className="result-cover">
                  <MusicNoteIcon />
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
function BrainIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 0 2h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1 0-2h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/></svg>
}
function UploadIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13v6H5v-6H3v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-2zM13 5.83l2.88 2.88 1.41-1.42L12 2 6.71 7.29l1.41 1.42L11 5.83V16h2V5.83z"/></svg>
}
function ChevronIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5-5 5 5z"/></svg>
}
function MusicNoteIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="#444"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/></svg>
}
function CheckIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="#888"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
}
