import client from "./app/bot"
import commands from "./commands"
import { config } from "dotenv";

config()

const bot = client()
const controller = commands(bot)

bot.on('message', (target, context, msg, self) => {
  if (self) return
  controller.execute(msg.trim(), { target, context })
})

bot.on("whisper", (from, context, msg, self) => {
  console.log(from, context.username);
})


bot.on('connected', (address, port) => {
  console.log("Twitch bot connected at:", address, port)
})

bot.connect()
