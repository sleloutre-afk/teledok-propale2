import { revalidatePath } from 'next/cache'

/**
 * Publications, réalisations, textes des valeurs et coordonnées viennent du
 * BO : après chaque modification, tout le site public est régénéré à la
 * prochaine visite. Silencieux hors contexte Next (script d'import, CLI Payload).
 */
export function revalidateSite() {
  try {
    revalidatePath('/', 'layout')
  } catch {
    // appelé hors d'une requête Next (ex. scripts/seed.ts) — rien à invalider
  }
}
