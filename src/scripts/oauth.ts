import axios from "axios";
import { config } from "dotenv";
config()

export async function getOAuthToken() {
  const data = {
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET,
    grant_type: "client_credentials"
  }
  try {
    const response = await axios.post("https://id.twitch.tv/oauth2/token", data)
    console.log(response.data)
  } catch (error) {
    console.error(error);
    
  }
}

getOAuthToken()