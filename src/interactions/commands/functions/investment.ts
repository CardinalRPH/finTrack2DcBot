import {
    SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../../types/command";


const investment: Command = {
    data: new SlashCommandBuilder()
        .setName("investment")
        .setDescription("Replies with pong"),

    async execute(interaction) {
        await interaction.reply("Pong!");
    },
};

export default investment;