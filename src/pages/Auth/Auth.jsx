import { useState } from 'react'
import './Auth.css'
import gadonaLogo from '../../assets/gadonaNO.png'
import { useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";

export default function Auth() {
  const [tab, setTab] = useState('login')
  const navigate = useNavigate()
  const [direction, setDirection] = useState('right')
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
  onClick={() => {
    setDirection('left')   
    setTab('login')
  }}
>
  Connexion
</button>
<button
  className={`auth-tab ${tab === 'register' ? 'active' : ''}`}
  onClick={() => {
    setDirection('right') 
    setTab('register')
  }}
>
  Inscription
</button>
          </div>

          {tab === 'login' ? (
            <div className="auth-form" key="login" data-dir={direction}>
              <div className="form-group">
                <label>Adresse e-mail</label>
                <input type="email" placeholder="exemple@gmail.com" />
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
                <FaGoogle /> Continuer avec Google
              </button>
            </div>
          ) : (
            <div className="auth-form" key="register" data-dir={direction}>
              <div className="form-group">
                <label>Nom complet</label>
                <input type="text" placeholder="Jean Dupont" />
              </div>
              <div className="form-group">
                <label>Adresse e-mail</label>
                <input type="email" placeholder="exemple@gmail.com" />
              </div>
              <div className="form-group">
                <label>Mot de passe</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <button className="btn-primary" onClick={() => navigate('/home')}>Créer mon compte</button>

              <div className="auth-divider"><span>ou</span></div>

              <button className="btn-google">
                <FaGoogle /> S'inscrire avec Google
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