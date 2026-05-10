import {
    Client,
    Interaction,
} from "discord.js";
import { commands } from "../interactions/commands";


export default (client: Client) => {
    client.on("interactionCreate", async (interaction: Interaction) => {

        if (!interaction.isChatInputCommand()) return;

        if(interaction.inGuild()) {
            // retunrn false emph
        }

        const command = commands.find(
            (cmd) => cmd.data.name === interaction.commandName
        );

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);

            await interaction.reply({
                content: "Something went wrong",
                ephemeral: true,
            });
        }
    });
};