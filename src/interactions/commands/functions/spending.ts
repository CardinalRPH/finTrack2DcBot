import {
    SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../../types/command";


const spending: Command = {
    data: new SlashCommandBuilder()
        .setName("spending")
        .setDescription("Replies with pong"),

    async execute(interaction) {
        await interaction.reply("Pong!");
    },
};

export default spending;