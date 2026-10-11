type ClassValue = string | false | null | undefined | Record<string, boolean | null | undefined>

/** Assemble une liste de classes CSS : chaînes, ou objets { classe: condition }. */
export function cx(...values: ClassValue[]): string {
  const out: string[] = []
  for (const value of values) {
    if (!value) continue
    if (typeof value === 'string') out.push(value)
    else for (const [name, on] of Object.entries(value)) if (on) out.push(name)
  }
  return out.join(' ')
}
