import express from "express";
import DiscordOAuth from "@arthur.dev/discord-oauth2";

// initialize the express app instance
const app = express();

// initialize the discord oauth instance
const oauth = new DiscordOAuth({
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
    callbackUrl: "http://localhost:8080/callback",
    scope: ["identify", "guilds", "connections"]
});

app.get("/login", (req, res) => {
    res.redirect(oauth.authorizationUrl);
});

app.get("/callback", async (req, res) => {
    const code  = req.query.code as string;
    if(!code) {
        // no code was provided so sending a bad request
        res.sendStatus(400);
    } else {
        try {
            // exchange the code discord gave us for user access tokens
            const exchangeResponse = await oauth.exchangeCode(code);
            const user = await oauth.fetchUser(exchangeResponse.access_token);
            res.send(`Hello, ${user.tag}`)
        } catch (error) {
            res.sendStatus(500);
            console.error(error);
        }
    }
});

// listen for requests on port 8080
app.listen(8080, () => {
    console.log("Discord OAuth Express Example running on port 8080")
});

