import type { NextRequest } from 'next/server'
import { handleForm } from '@/lib/formEndpoint'

/** Demande de contact (pages « Partenaires » et « Contact »). */
export const POST = (request: NextRequest) => handleForm('contact', request)
