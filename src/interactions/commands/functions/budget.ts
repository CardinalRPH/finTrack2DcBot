import {
    SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../../types/command";


const budget: Command = {
    data: new SlashCommandBuilder()
        .setName("budget")
        .setDescription("Replies with pong"),

    async execute(interaction) {
        await interaction.reply("Pong!");
    },
};

export default budget;