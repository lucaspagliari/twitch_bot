// import { ApiClient } from "@twurple/api"
import { StaticAuthProvider } from '@twurple/auth'
import { ChatClient } from "@twurple/chat"
import { config } from "dotenv"
import { RefreshingAuthProvider } from '@twurple/auth'
import { readFileSync, writeFileSync } from 'fs'
import axios, { AxiosRequestConfig } from "axios"
import { join } from 'path'
config()

const twitchAPI = process.env.TWITCH_OAUTH_API || ""
const accessToken = process.env.TWITCH_ACCESS_TOKEN || ""
const clientSecret = process.env.TWITCH_CLIENT_SECRET || ""
const clientId = process.env.TWITCH_CLIENT_ID || ""

const codeFilePath = join(__dirname, "code.txt")
const jsonFilePath = join(__dirname, "tokens.json")

export async function getAccessToken() {
  const file = readFileSync(codeFilePath)
  const code = file.toString().trim()

  if (!code) {
    console.error("No code founded, run our api locally and access to get code");
    return
  }

  const data = {
    code: code,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    redirect_uri: "http://localhost"
  }
  try {

    const response = await axios.post(twitchAPI + "/token", data)
    if (response.status == 200) {
      writeFileSync(jsonFilePath, JSON.stringify(response.data, null, 4))
    }
  } catch (error) {
    console.error("##### ACCESS TOKEN ERROR #####");
    console.error(error);

  }
}


export function refreshingAuthProvider() {
  const tokenData = JSON.parse(String(readFileSync(jsonFilePath)))
  return new RefreshingAuthProvider(
    {
      clientId,
      clientSecret,
      onRefresh: async newTokenData => writeFileSync(jsonFilePath, JSON.stringify(newTokenData, null, 4))
    },
    tokenData
  )
}

export function authProvider(): StaticAuthProvider {
  const tokenData = JSON.parse(String(readFileSync('./tokens.json')))
  const accessToken = tokenData.accessToken
  return new StaticAuthProvider(clientId, accessToken, ['chat:read', 'chat:edit'])
}

// export function apiClient(authProvider: StaticAuthProvider): ApiClient {
//   return new ApiClient({ authProvider })
// }

export function chatClient(authProvider: any, channels: string[]): ChatClient {
  const chatClient = new ChatClient({ authProvider, channels })
  return chatClient
}


