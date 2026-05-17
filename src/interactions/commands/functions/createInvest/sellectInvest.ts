import { StringSelectMenuInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from "discord.js";

const investSelectInvestment = async (interaction: StringSelectMenuInteraction) => {
    const walletId = interaction.customId.split("_")[3];
    const investId = interaction.values[0];

    const modal = new ModalBuilder()
        .setCustomId(`crinvest_modal_${walletId}_${investId}`)
        .setTitle("Enter Transaction Details");

    const amountInput = new TextInputBuilder()
        .setCustomId("crinvest_amount")
        .setLabel("Amount (IDR)")
        .setPlaceholder("e.g. 15000")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const descInput = new TextInputBuilder()
        .setCustomId("crinvest_desc")
        .setLabel("Description (Optional)")
        .setPlaceholder("e.g. Reksadana Uang")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false);

    modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(amountInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(descInput)
    );

    await interaction.showModal(modal);
}

export default investSelectInvestment 