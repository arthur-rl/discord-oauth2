export interface DiscordOAuthOptions {
    clientId: string;
    clientSecret: string;
    scope: string[];
    callbackUrl: string;
}

export interface DiscordOAuthExchangeResponse {
    access_token: string;
    refresh_token: string;
}

export interface IDiscordUser {
    id: string;
    username: string;
    discriminator: string;
    tag: string;
    createdAt: Date;
}