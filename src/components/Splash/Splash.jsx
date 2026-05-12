import './Splash.css'
import gadonaLogo from '../../assets/gadonaNO.png'

export default function Splash() {
  return (
    <div className="splash" id="splash">
      <div className="splash-logo">
        <img src={gadonaLogo} alt="Gadona AI" className="splash-logo-img" />
      </div>
      <div className="splash-title">Gadona AI</div>
      <div className="splash-tagline">L'expérience musicale monochrome.</div>
      <div className="splash-bar">
        <div className="splash-fill" />
      </div>
    </div>
  )
}