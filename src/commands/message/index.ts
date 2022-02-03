import { writeFile, statSync } from "fs"
import { join } from "path"
import { Client } from "tmi.js"
import { params } from "../controllers"

const filePath = join(__dirname, "data", "message.txt")
const maxSizeBytes = 1000000 // 1 mb


function write(content: string): string {
  try {
    const stats = statSync(filePath)
    if (stats.size >= maxSizeBytes) {
      return "Sorry our inbox is full... :/"
    }
    writeFile(filePath, content, { flag: "a+" }, () => { })
    return "Message saved 🐈"
  } catch (error) {
    console.error(error)
    return "Something bad happened"
  }
}

function leavemessage(client: Client, params: params) {
  const msg = params.args.join(" ")
  const username = params.context.username || ""
  if (msg.length > 144) {
    const r = `@${username} message is too long, max 144 characters`
    client.say(params.target, r)
  }

  const date = new Date().toISOString()
  const content = `${date},${username}:${msg}\n`

  const response = write(content)
  client.say(params.target, `@${username} ${response}`)
}

function leavemsg(client: Client, params: params) {
  leavemessage(client, params)
}

export default { leavemessage, leavemsg }