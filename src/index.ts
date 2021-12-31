import axios, { AxiosInstance } from "axios";
import qs from "qs";
import { DISCORD_API_BASE_URI } from "./constants";
import DiscordUser from "./data/DiscordUser";
import { DiscordOAuthExchangeResponse, DiscordOAuthOptions } from "./types";

export default class DiscordOAuth {
    private readonly clientId: string;
    private readonly clientSecret: string;
    private readonly scope: string[];
    private readonly callbackUrl: string;
    private readonly axios: AxiosInstance;
    constructor(options: DiscordOAuthOptions) {
        this.clientId = options.clientId;
        this.clientSecret = options.clientSecret;
        this.scope = options.scope;
        this.callbackUrl = options.callbackUrl;
        this.axios = axios.create({
            baseURL: DISCORD_API_BASE_URI,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    get authorizationUrl(): string {
        const url = "https://discord.com/api/oauth2/authorize?" + qs.stringify({
            client_id: this.clientId,
            redirect_uri: this.callbackUrl,
            scope: this.scope.join(" "),
            response_type: "code"
        });
        return url;
    }

    public async exchangeCode(code: string): Promise<DiscordOAuthExchangeResponse> {
        return await new Promise((resolve,  reject) => {
            this.axios({
                url: "/oauth2/token",
                method: "POST",
                data: qs.stringify({
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    grant_type: "authorization_code",
                    code: code,
                    redirect_uri: this.callbackUrl,
                })
            }).then(d => {
                resolve(d.data);
            }).catch(reject);
        });
    }

    public async fetchUser(access_token: string): Promise<DiscordUser> {
        return await new Promise((resolve, reject) => {
            this.axios({
                url: "/users/@me",
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }).then(d => {
                resolve(new DiscordUser(d.data, access_token));
            }).catch(reject)
        });
    }
}