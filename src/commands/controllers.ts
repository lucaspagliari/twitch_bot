import { Client, ChatUserstate } from "tmi.js"

export interface params {
  target: string
  context: ChatUserstate
  command: string
  args: string[]
}

interface parseResult {
  command: string
  args: string[]
}


export class CommandsController {
  client: Client
  commands: Map<string, Function> = new Map()

  constructor(client: Client) {
    this.client = client
  }

  private getFunction(key: string): Function {
    let fun = this.commands.get(key)
    if (!fun) {
      fun = () => { console.log(`Command ${key} does not exists`) }
    }
    return fun
  }

  private setFunction(key: string, fun: Function): void {
    if (this.hasCommand(key)) {
      const msg = `Command ${key} already exists, `
        + `name must be unique,\n`
        + `${fun.toString()}\n ***Function will be ignored***`
      console.error(msg)
      return
    }
    this.commands.set(key, fun)
  }

  private hasCommand(key: string): boolean {
    return this.commands.has(key)
  }

  private parseMessage(key: string): parseResult {
    if (key.includes(" ")) {
      const arr = key.split(" ")
      const args = arr.slice(1, arr.length)
      return { command: arr[0], args }
    }
    return { command: key, args: [] }
  }

  public execute(key: string, params: any) {
    if (!key.charAt(0) || key.length < 2) {
      return
    }

    let args = this.parseMessage(key)
    const fun = this.getFunction(args.command)

    fun(this.client, Object.assign(params, args))
  }

  public addCommand(msg: string, fun: Function) {
    if (msg && msg.length) {
      msg = msg.charAt(0) == "!" ? msg : `!${msg}`
      this.setFunction(msg, fun)
    }
  }

  public addManyCommands(commands: any) {
    Object.keys(commands).map(msg => {
      this.addCommand(msg, commands[msg])
    })
  }
}