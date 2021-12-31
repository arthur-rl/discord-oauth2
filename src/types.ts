export interface DiscordOAuthOptions {
    clientId: string;
    clientSecret: string;
    scope: string[];
    callbackUrl: string;
}

export interface DiscordOAuthExchangeResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

export interface IDiscordUser {
    id: string;
    username: string;
    discriminator: string;
    tag: string;
    createdAt: Date;
}