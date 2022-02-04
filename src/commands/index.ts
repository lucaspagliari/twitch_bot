import { Client } from "tmi.js"
import { CommandsController } from "./controllers"

import random from "./random"
import message from "./message"



export default function commands(client: Client) {
  const commands = new CommandsController(client)

  commands.addCommandsList(random)
  commands.addCommandsList(message)

  return commands
}


