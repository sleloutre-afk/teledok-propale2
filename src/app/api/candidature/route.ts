import type { NextRequest } from 'next/server'
import { handleForm } from '@/lib/formEndpoint'

/** Candidature médecin (page « Médecins : rejoindre TeleDok »). */
export const POST = (request: NextRequest) => handleForm('candidature', request)
