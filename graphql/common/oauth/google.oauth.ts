import { OAuth2Client } from "google-auth-library"

export const verifyGoogle = (async(token : string) => {
    console.log(process.env.GOOGLE_OAUTH_CLIENT_ID)
    console.log(token)
    const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID)
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
    })
    console.log(ticket)
    return ticket.getPayload()

})
