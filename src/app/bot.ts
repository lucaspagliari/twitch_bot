import tmi from "tmi.js"


function client() {
  const opts = {
    identity: {
      username: process.env.BOT_USERNAME || "",
      password: process.env.OAUTH_TOKEN || ""
    },
    channels: [
      process.env.CHANNEL_NAME || ""
    ]
  }
  return new tmi.client(opts)
}



export default client;