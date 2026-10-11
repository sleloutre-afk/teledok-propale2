const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']

/** « mars 2025 » — la date est enregistrée en UTC, le mois affiché ne dépend pas du fuseau du serveur. */
export function formatMonth(iso: string): string {
  const date = new Date(iso)
  return `${MOIS[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}
