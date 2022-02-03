import { Client } from "tmi.js"
import { CommandsController } from "./controllers"

import random from "./random"
import message from "./message"



export default function commands(client: Client) {
  const commands = new CommandsController(client)

  commands.addManyCommands(random)
  commands.addManyCommands(message)

  return commands
}


