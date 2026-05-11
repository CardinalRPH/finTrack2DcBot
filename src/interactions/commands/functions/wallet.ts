import {
    SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../../types/command";


const wallet: Command = {
    data: new SlashCommandBuilder()
        .setName("wallet")
        .setDescription("Replies with pong"),

    async execute(interaction) {
        await interaction.reply("Pong!");
    },
};

export default wallet;