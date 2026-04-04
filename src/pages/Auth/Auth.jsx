import { useState } from 'react'
import './Auth.css'
import gadonaLogo from '../../assets/gadonaNO.png'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
  const [tab, setTab] = useState('login')
  const navigate = useNavigate()
  return (
    <div className="auth-wrapper">
      <div className="auth-container">

        <div className="auth-logo">
          <img src={gadonaLogo} alt="Gadona AI" className="auth-logo-img" />
          <span className="auth-logo-name">Gadona AI</span>
        </div>
        <p className="auth-tagline">L'expérience musicale monochrome.</p>

        <div className="auth-card">

          <div className="auth-tabs">
            <button
              className={`auth-tab ${tab === 'login' ? 'active' : ''}`}
              onClick={() => setTab('login')}
            >
              Connexion
            </button>
            <button
              className={`auth-tab ${tab === 'register' ? 'active' : ''}`}
              onClick={() => setTab('register')}
            >
              Inscription
            </button>
          </div>

          {tab === 'login' ? (
            <div className="auth-form">
              <div className="form-group">
                <label>Adresse e-mail</label>
                <input type="email" placeholder="exemple@email.com" />
              </div>
              <div className="form-group">
                <div className="form-group-header">
                  <label>Mot de passe</label>
                  <a href="#">Mot de passe oublié ?</a>
                </div>
                <input type="password" placeholder="••••••••" />
              </div>
              <button className="btn-primary" onClick={() => navigate('/home')}>Se connecter</button>

              <div className="auth-divider"><span>ou</span></div>

              <button className="btn-google">
                <GoogleIcon /> Continuer avec Google
              </button>
            </div>
          ) : (
            <div className="auth-form">
              <div className="form-group">
                <label>Nom complet</label>
                <input type="text" placeholder="Jean Dupont" />
              </div>
              <div className="form-group">
                <label>Adresse e-mail</label>
                <input type="email" placeholder="exemple@email.com" />
              </div>
              <div className="form-group">
                <label>Mot de passe</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <button className="btn-primary" onClick={() => navigate('/home')}>Créer mon compte</button>

              <div className="auth-divider"><span>ou</span></div>

              <button className="btn-google">
                <GoogleIcon /> S'inscrire avec Google
              </button>

              <p className="auth-terms">
                En créant un compte, vous acceptez nos{' '}
                <a href="#">Conditions d'utilisation</a> et notre{' '}
                <a href="#">Politique de confidentialité</a>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#fff" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
      <path fill="#ccc" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
      <path fill="#aaa" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
      <path fill="#eee" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
    </svg>
  )
}