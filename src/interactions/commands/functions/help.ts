import {
    SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../../types/command";


const help: Command = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Replies with pong"),

    async execute(interaction) {
        await interaction.reply("Pong!");
    },
};

export default help;