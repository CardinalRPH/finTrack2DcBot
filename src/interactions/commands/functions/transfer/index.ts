import { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../../../types/command";
import { ApiResponseData } from "../../../../types/apiResponseData";
import { walletType } from "../../../../types/API Response/wallet";
import { apiFetch } from "../../../../libs/apiFetch";

const transfer: Command = {
    data: new SlashCommandBuilder()
        .setName("transfer")
        .setDescription("Record a new transfer"),

    async execute(interaction: ChatInputCommandInteraction) {
        try {
            const { data: wallets } = await apiFetch<ApiResponseData<walletType[]>>("/wallets", {
                headers: { "x-discord-id": interaction.user.id },
                method: "GET"
            });

            if (!wallets || wallets.length === 0) {
                return void await interaction.reply({ content: "❌ No wallets found.", ephemeral: true });
            }

            const walletMenu = new StringSelectMenuBuilder()
                .setCustomId("transfer_select_wallet")
                .setPlaceholder("Step 1: Choose a Wallet")
                .addOptions(wallets.map(w => ({ label: w.name, value: w.id, description: `Type: ${w.type}` })));

            const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(walletMenu);

            await interaction.reply({
                content: "Let's record your transfer! First, select the wallet you used:",
                components: [row],
                ephemeral: true
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "Failed to initialize command.", ephemeral: true });
        }
    }
};

export default transfer;