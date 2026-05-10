import {
    SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../../types/command";


const ping: Command = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong"),

    async execute(interaction) {
        await interaction.reply("Pong!");
    },
};

export default ping;