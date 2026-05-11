import {
    SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../../types/command";


const prompt: Command = {
    data: new SlashCommandBuilder()
        .setName("prompt")
        .setDescription("Replies with pong"),

    async execute(interaction) {
        await interaction.reply("Pong!");
    },
};

export default prompt;