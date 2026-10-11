import logo from '@/assets/logo-teledok.png'
import logoBlanc from '@/assets/logo-teledok-blanc.png'

/**
 * Remplace le logo Payload de l'écran de connexion par le logo TeleDok
 * (version couleur en thème clair, blanche en thème sombre — bascule dans
 * custom.scss).
 */
export function AdminLogo() {
  return (
    <span className="graphic-logo teledok-logo">
      <img className="teledok-logo__light" src={logo.src} width={220} height={61} alt="TeleDok" />
      <img className="teledok-logo__dark" src={logoBlanc.src} width={220} height={61} alt="TeleDok" />
    </span>
  )
}

export default AdminLogo
