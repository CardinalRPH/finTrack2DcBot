import {
    ApplicationIntegrationType,
    InteractionContextType,
    SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../../types/command";


const createRecord: Command = {
    data: new SlashCommandBuilder()
        .setName("create-record")
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

export default createRecord;