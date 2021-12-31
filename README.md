# discord-oauth2
A simple NPM package to interact with the discord OAuth2 API

# Examples
* [Express](https://github.com/arthur-rl/discord-oauth2/tree/master/examples/express)

# Installation

With NPM:
```
npm install pending-name
```
or with Yarn:
```
yarn add pending-name
```

## Usage

```ts
const oauth = new DiscordOAuth({
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
    callbackUrl: "http://localhost:8080/callback",
    scope: ["identify", "guilds", "connections"]
});
```
* Exchange code for Discord Access Token
```ts
const { access_token } = oauth.exchangeCode(code);
```
* Fetch user
```ts
const user = await oauth.fetchUser(access_token)
```
* Get user guilds and connections
```ts
const guilds = await user.guilds();
const connections = await user.connections();
console.log(guilds);
console.log(connections);
```

# Contributing
All PRs are welcome. :)



