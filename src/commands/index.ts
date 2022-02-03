import { Client } from "tmi.js";
import { CommandsController } from "./controllers";

import random from "./random"



export default function commands(client: Client) {
  const commands = new CommandsController(client);

  commands.addManyCommands(random);

  return commands;
}


