import { Client } from "tmi.js"
import { params } from "../controllers"


function _dice() {
  return Math.floor(Math.random() * 6 + 1);
}

function dice(client: Client, params: params) {
  const user = params.context.username || "";
  client.say(params.target, `@${user} Your Rolled: ${_dice()}`);
}

function guessage(client: Client, params: params) {
  if (params.args[0] == "22") {
    client.say(params.target, `You got it right`);
    return
  }
  client.say(params.target, `Hmmmm wrong answer, try again later...`);
}



export default {
  dice,
  guessage
}