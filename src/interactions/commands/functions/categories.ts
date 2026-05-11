import {
    SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../../types/command";


const categories: Command = {
    data: new SlashCommandBuilder()
        .setName("categories")
        .setDescription("Replies with pong"),

    async execute(interaction) {
        await interaction.reply("Pong!");
    },
};

export default categories;