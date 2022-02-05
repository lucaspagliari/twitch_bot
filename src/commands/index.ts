import { ChatClient } from "@twurple/chat"
import { TwitchPrivateMessage } from "@twurple/chat/lib/commands/TwitchPrivateMessage"

interface MessageParams {
  channel: string
  message: string
  user: string
  twitch: TwitchPrivateMessage
}
interface CommandParams extends MessageParams {
  command: string
  args: string[]
}

class CommandsController {
  chat: ChatClient | undefined
  commands: Map<string, Function> = new Map()

  constructor(chatClient: ChatClient) {
    this.chat = chatClient
  }

  private getCommand(name: string): Function {
    if (this.commands.has(name)) {
      const method = this.commands.get(name)
      if (method) return method
    }
    return () => { console.log(`Command '${name}' does not exists`) }
  }

  private setCommand(name: string, fun: Function): void {
    if (this.commands.has(name)) {
      console.error(`Command '${name}' already exists`)
      return
    }
    this.commands.set("!" + name, fun)
  }

  public add(commands: any) {
    Object.keys(commands).map(name => {
      this.setCommand(name, commands[name])
    })
  }


  exec(command: string, data: MessageParams) {
    const arr: string[] = command.split(" ")
    command = arr[0];
    const args = arr.slice(0, arr.length)
    const method = this.getCommand(command)

    let params: CommandParams = {
      args,
      command,
      ...data
    };
    method(params)
  }
}




export default function commands(chat: ChatClient) {
  const commands = new CommandsController(chat)

  // commands.addCommandsList(random)
  // commands.addCommandsList(message)

  return commands
}

