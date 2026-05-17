import {
    ApplicationIntegrationType,
    InteractionContextType,
    SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../../types/command";


const budget: Command = {
    data: new SlashCommandBuilder()
        .setName("budget")
        .setDescription("Replies with pong")
        .setContexts(
            InteractionContextType.BotDM,
        )
        .setIntegrationTypes(
            ApplicationIntegrationType.UserInstall
        ),

    async execute(interaction) {
        await interaction.reply("Pong!");
    },
};

export default budget;