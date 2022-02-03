import { Client } from "tmi.js"
import { params } from "../controllers"


function _dice(): number {
  return Math.floor(Math.random() * 6 + 1)
}

function dice(client: Client, params: params) {
  const user = params.context.username || ""
  client.say(params.target, `@${user} Your Rolled: ${_dice()}`)
}

function guessdice(client: Client, params: params) {
  if (params.args.length == 0) {
    return
  }

  const result = _dice().toString()

  const msg = `@${params.context.username} guessed ${params.args[0]}. `
    + `Dice rolled ${result}`

  client.say(params.target, msg)
}

function guessage(client: Client, params: params) {
  if (params.args.length == 0) {
    return
  }
  const diff = new Date().getTime() - new Date(1999, 1, 13).getTime()
  const age = Math.abs(new Date(diff).getUTCFullYear() - 1970)

  if (params.args[0] == age.toString()) {
    client.say(params.target, `@${params.context.username} You got it right!!`)
    return
  }
  client.say(params.target, `Hmmmm wrong answer @${params.context.username}, try again later...`)
}


export default {
  dice,
  guessage,
  guessdice
}