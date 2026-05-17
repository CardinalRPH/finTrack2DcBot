import {
    Client,
    Interaction,
} from "discord.js";
import { commands } from "../interactions/commands";
import outcomeHandler from "../interactions/commands/functions/outcome/handler";
import incomeHandler from "../interactions/commands/functions/income/handler";
import investHandler from "../interactions/commands/functions/createInvest/handler";


export default (client: Client) => {
    client.on("interactionCreate", async (interaction: Interaction) => {

        if (!interaction.isChatInputCommand()) return;

        if (interaction.inGuild()) {
            // retunrn false emph
            return
        }

        const command = commands.find(
            (cmd) => cmd.data.name === interaction.commandName
        );

        if (!command) return;

        try {
            await command.execute(interaction);

            await outcomeHandler(interaction)
            await incomeHandler(interaction)
            await investHandler(interaction)

        } catch (error) {
            console.error(error);

            await interaction.reply({
                content: "Something went wrong",
                ephemeral: true,
            });
        }
    });
};