import express from "express"
import { config } from "dotenv"
import { readFile, writeFile } from "fs";
import { join } from "path";
config()

const port = 3000
/* To get code from twitch api example:
  https://id.twitch.tv/oauth2/authorize?client_id=CLIENT_ID
    &redirect_uri=REDIRECT_URI
    &response_type=code
    &scope=chat:read+chat:edit
*/
const twitchAPI = process.env.TWITCH_OAUTH_API || ""
const clientId = process.env.TWITCH_CLIENT_ID || ""
const redirectUri = `http://localhost:${port}/code`
const respondeType = "code"
const scope = "chat:read+chat:edit"

const tokensFilePath = join(__dirname, "tokens.json")


const link = `${twitchAPI}/authorize`
  + `?client_id=${clientId}`
  + `&redirect_uri=${redirectUri}`
  + `&response_type=${respondeType}`
  + `&scope=${scope}`


const app = express()

app.get("/", (req, res) => {
  if (Object.keys(req.params).length) {
    res.send("hello\n" + JSON.stringify(req.params))
  } else {
    res.redirect(link)
  }
})

app.get("/code", (req, res) => {
  if (req.query.error || req.query.errors) {
    res.send("something went wrong")
  }
  if (req.query.code) {
    readFile(tokensFilePath, (err, data) => {
      if (err) {
        res.send("something went wrong")
        return;
      }
      const json = JSON.parse(String(data))
      json.code = String(req.query.code);;
      writeFile(tokensFilePath, JSON.stringify(json, null, 4), (err) => { })
    })
    res.send("Saving locally your code: " + req.query.code)
  }
})

app.listen(port, () => {
  console.log("Server running on:", `http://localhost:${port}`);
})
