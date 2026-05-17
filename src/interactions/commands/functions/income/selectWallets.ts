import { StringSelectMenuInteraction, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import { ApiResponseData } from "../../../../types/apiResponseData";
import { categoryType } from "../../../../types/API Response/categories";
import { apiFetch } from "../../../../libs/apiFetch";


const incomeSelectWallet = async (interaction: StringSelectMenuInteraction) => {
    try {
        const selectedWalletId = interaction.values[0];

        const { data: categories } = await apiFetch<ApiResponseData<categoryType[]>>("/categories", {
            headers: { "x-discord-id": interaction.user.id },
            method: "GET"
        });

        if (!categories || categories.length === 0) {
            return void await interaction.reply({ content: "❌ No categories found.", ephemeral: true });
        }

        const categoryMenu = new StringSelectMenuBuilder()
            .setCustomId(`income_select_cat_${selectedWalletId}`)
            .setPlaceholder("Step 2: Choose a Category")
            .addOptions(categories.filter(val => !val.name.includes("CTX.Invest") || !val.name.includes("CTX.Transfer")).map(c => ({ label: c.name, value: c.id })));

        const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(categoryMenu);

        await interaction.update({
            content: "Great! Now, choose the category for this income:",
            components: [row]
        });
    } catch (error) {
        console.error(error);
    }
}

export default incomeSelectWallet