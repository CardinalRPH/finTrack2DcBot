import { StringSelectMenuInteraction, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import { ApiResponseData } from "../../../../types/apiResponseData";
import { categoryType } from "../../../../types/API Response/categories";
import { apiFetch } from "../../../../libs/apiFetch";
import { walletType } from "../../../../types/API Response/wallet";


const transferSelectWallet = async (interaction: StringSelectMenuInteraction) => {
    try {
        const selectedWalletId = interaction.values[0];

        const { data: wallets } = await apiFetch<ApiResponseData<walletType[]>>("/wallets", {
            headers: { "x-discord-id": interaction.user.id },
            method: "GET"
        });

        if (!wallets || wallets.length === 0 || wallets.filter(val => val.id !== selectedWalletId).length === 0) {
            return void await interaction.reply({ content: "❌ No wallets found.", ephemeral: true });
        }

        const toWalletMenu = new StringSelectMenuBuilder()
            .setCustomId(`transfer_select_toWallet_${selectedWalletId}`)
            .setPlaceholder("Step 2: Choose a wallet destination")
            .addOptions(wallets.filter(val => val.id !== selectedWalletId).map(c => ({ label: c.name, value: c.id })));

        const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(toWalletMenu);

        await interaction.update({
            content: "Great! Now, choose the wallet destination:",
            components: [row]
        });
    } catch (error) {
        console.error(error);
    }
}

export default transferSelectWallet