import axios, { AxiosInstance } from "axios";
import { APIConnection, APIGuild } from "discord-api-types";
import { DISCORD_API_BASE_URI } from "../constants";
import { IDiscordUser } from "../types";

export default class DiscordUser implements IDiscordUser {
    private readonly user: IDiscordUser;
    private readonly axios: AxiosInstance;
    constructor(user: IDiscordUser, access_token: string) {
        this.user = {
            ...user,
            tag: `${user.username}#${user.discriminator}`
        };

        this.axios = axios.create({
            baseURL: DISCORD_API_BASE_URI + "/users/@me",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${access_token}`
            }
        });
    }

    public get id(): string {
        return this.user.id;
    }

    public get username(): string {
        return this.user.username;
    }

    public get discriminator(): string {
        return this.user.discriminator;
    }

    public get tag(): string {
        return this.user.tag;
    }

    public get createdAt(): Date {
        return this.user.createdAt;
    }
    
    /** 
     * Fetches all user guilds from the Discord API
     * Requires the `guilds` scope
     * @returns Promise<APIGuild[]> 
     */
    public async guilds(): Promise<APIGuild[]> {
        return await new Promise((resolve, reject) => {
            this.axios.get("/guilds").then(d => {
                resolve(d.data);
            }).catch(reject);
        });
    }

    /**
     * Fetches all user connections from the discord API.
     * Requires the `connections` scope
     * @returns Promise<APIConnection[]>
     */
    public async connections(): Promise<APIConnection[]> {
        return await new Promise((resolve, reject) => {
            this.axios.get("/connections").then(d => {
                resolve(d.data);
            }).catch(reject);
        });
    }
}