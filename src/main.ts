import tmi from "tmi.js"
import commands from "./commands"


const BOT_USERNAME = "laap_bot"
const CHANNEL_NAME = "lucaspagliari"
const OAUTH_TOKEN = "oauth:pvqsxot908sv255jgfefn1s4ja855h"
const opts = {
  identity: {
    username: BOT_USERNAME,
    password: OAUTH_TOKEN
  },
  channels: [
    CHANNEL_NAME
  ]
}

const client = new tmi.client(opts)
const controller = commands(client)

client.on('message', (target, context, msg, self) => {
  if (self) return
  controller.execute(msg.trim(), { target, context })
})

client.on('connected', (address, port) => {
  console.log("Twitch bot connected at:", address, port)
})

client.connect()

export default client