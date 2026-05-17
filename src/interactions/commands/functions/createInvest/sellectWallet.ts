import { StringSelectMenuInteraction, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import { ApiResponseData } from "../../../../types/apiResponseData";
import { categoryType } from "../../../../types/API Response/categories";
import { apiFetch } from "../../../../libs/apiFetch";
import { investType } from "../../../../types/API Response/investment";


const createInvestSelectWallet = async (interaction: StringSelectMenuInteraction) => {
    try {
        const selectedWalletId = interaction.values[0];

        const { data: investment } = await apiFetch<ApiResponseData<investType[]>>("/investment", {
            headers: { "x-discord-id": interaction.user.id },
            method: "GET"
        });

        if (!investment || investment.length === 0) {
            return void await interaction.reply({ content: "❌ No investment found.", ephemeral: true });
        }

        const investMenu = new StringSelectMenuBuilder()
            .setCustomId(`crinvest_select_inv_${selectedWalletId}`)
            .setPlaceholder("Step 2: Choose a Investment")
            .addOptions(investment.map(c => ({ label: c.assetName, value: c.id })));

        const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(investMenu);

        await interaction.update({
            content: "Great! Now, choose the Investment for this record:",
            components: [row]
        });
    } catch (error) {
        console.error(error);
    }
}

export default createInvestSelectWallet