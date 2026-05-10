import {
    Client,
    GatewayIntentBits,
    Partials,
} from "discord.js";

import dotenv from "dotenv";
import deployCommands from "./interactions/commands/deployCommand";
import interactionCreate from "./events/interactionCreate";
import messageCreate from "./events/messageCreate";

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,

        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,

        GatewayIntentBits.MessageContent,
    ],

    partials: [Partials.Channel],
});

client.once("ready", () => {
    deployCommands()
    console.log(`Logged in as ${client.user?.tag}`);
});
messageCreate(client)
interactionCreate(client)

client.login(process.env.DISCORD_TOKEN);