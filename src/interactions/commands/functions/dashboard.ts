import {
    ApplicationIntegrationType,
    InteractionContextType,
    SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../../types/command";


const dashboard: Command = {
    data: new SlashCommandBuilder()
        .setName("dashboard")
        .setDescription("Replies with pong")
        .setContexts(
            InteractionContextType.BotDM, //for dm
            // InteractionContextType.Guild, //for guild
            // InteractionContextType.PrivateChannel // private server
        )
        .setIntegrationTypes(
            // ApplicationIntegrationType.GuildInstall, // for guild
            ApplicationIntegrationType.UserInstall // for dm
        ),

    async execute(interaction) {
        await interaction.reply("Pong!");
    },
};

export default dashboard;