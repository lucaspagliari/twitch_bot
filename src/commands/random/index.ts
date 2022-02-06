import { ChatClient } from "@twurple/chat/lib"
import { CommandParams } from ".."

function _dice(): number {
  return Math.floor(Math.random() * 6 + 1)
}

function dice(client: ChatClient, params: CommandParams) {
  client.say(params.channel, `@${params.user} you rolled: ${_dice()}`)
}

function guessdice(client: ChatClient, params: CommandParams) {
  if (params.args.length == 0) {
    return
  }
  const result = _dice().toString()
  const userGuess = params.args[0];
  
  let msg = ""
  msg = `Dice Rolled: ${result}. `
  if (result == userGuess) {
    msg += "You got it right"
  } else {
    msg += "Wrong number.."
  }

  client.say(params.channel, `${msg} @${params.user}`)
}

function guessage(client: ChatClient, params: CommandParams) {
  if (params.args.length == 0) {
    return
  }
  const diff = new Date().getTime() - new Date(1999, 1, 13).getTime()
  const age = Math.abs(new Date(diff).getUTCFullYear() - 1970)

  if (params.args[0] == age.toString()) {
    client.say(params.channel, `@${params.user} You got it right!!`)
    return
  }
  client.say(params.channel, `Hmmmm wrong answer @${params.user}, try again later...`)
}


export default {
  dice,
  guessage,
  guessdice
}