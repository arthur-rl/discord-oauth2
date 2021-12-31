# discord-oauth2
A simple NPM package to interact with the discord OAuth2 API

# Examples
* [Express](https://github.com/arthur-rl/discord-oauth2/tree/master/examples/express)

# Installation

With NPM:
```
npm install @arthur.dev/discord-oauth2
```
or with Yarn:
```
yarn add @arthur.dev/discord-oauth2
```

## Usage


```ts
import DiscordOAuth from '@arthur.dev/discord-oauth2';
```
or
```js
const DiscordOAuth = require("@arthur.dev/discord-oauth2");
```

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
* Exchange refresh token for a new Discord Access Token
```ts
const { access_token } = oauth.exchangeRefreshToken(refresh_token);
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
When contributing please ensure you use NPM as your package manager. 

* ## **Building**
    * `npm install` to install dependencies
    * `npm run build` to build the module

* ## **Development & Testing**
    When contributing it is recommended to test your changes to do this you could use the [Express](https://github.com/arthur-rl/discord-oauth2/tree/master/examples/express) example. Or you could create a new example, though if you would like the push these changes please do so in a seperate pull request.
* ## **Coding Conventions**
    * Use 4 space indentation
    * Use camelCase for function names and class members
    * UPPER_CASE for constant variables defined in `src/constants.ts`

* ## [**Commit Conventions**](https://www.conventionalcommits.org/en/v1.0.0/)




