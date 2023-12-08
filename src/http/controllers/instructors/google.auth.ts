import { env } from '@/env'
import { OAuth2Client } from 'google-auth-library'

export const oauth2Client = new OAuth2Client(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  'postmessage',
)

export async function getGoogleAuthToken(code: string) {
  const { tokens } = await oauth2Client.getToken(code)
  return tokens
}

export async function verifyGoogleIdToken(idToken: string) {
  const ticket = await oauth2Client.verifyIdToken({
    audience: env.GOOGLE_CLIENT_ID,
    idToken,
  })

  const payload = ticket.getPayload()
  return payload
}
