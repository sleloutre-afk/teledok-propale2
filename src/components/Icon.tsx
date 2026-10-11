import { icons, type IconName } from '@/data/icons'
import { cx } from '@/lib/cx'

type Props = {
  name: IconName
  size?: number
  stroke?: string
  width?: number
  /** Dessine le tracé à l'entrée dans la fenêtre (voir SiteBehaviors). */
  trace?: boolean
  className?: string
}

/** Icône linéaire du jeu src/data/icons.ts. Décorative : masquée aux lecteurs d'écran. */
export function Icon({ name, size = 40, stroke = 'currentColor', width = 1.8, trace = false, className }: Props) {
  const icon = icons[name]
  return (
    <svg
      className={cx(className, { trace }) || undefined}
      width={size}
      height={size}
      viewBox={`0 0 ${icon.vb} ${icon.vb}`}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  )
}
