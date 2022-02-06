import { chatClient, authProvider, refreshingAuthProvider, getAccessToken } from "./app/chat"
import commands from "./commands"
import { config } from "dotenv";

config()

async function start() {
  // await getAccessToken();

  const auth = authProvider();
  const chat = chatClient(auth, ['lucaspagliari']);
  const commandsController = commands(chat)


  chat.onMessage((channel, user, message, twitch) => {
    console.log(channel, user, message);
    message = message.trim()

    if (!message) {
      return
    }
    if (message.charAt(0) == "!") {
      commandsController.exec(message, { message, channel, user, twitch });
    }
  })

  chat.onConnect(() => {
    console.log("chat client connected")
  })

  chat.connect();
}
start()
