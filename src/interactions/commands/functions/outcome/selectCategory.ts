import { StringSelectMenuInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from "discord.js";

const outcomeSelectCategory = async (interaction: StringSelectMenuInteraction) => {
    const walletId = interaction.customId.split("_")[3];
    const categoryId = interaction.values[0];

    const modal = new ModalBuilder()
        .setCustomId(`outcome_modal_${walletId}_${categoryId}`)
        .setTitle("Enter Transaction Details");

    const amountInput = new TextInputBuilder()
        .setCustomId("outcome_amount")
        .setLabel("Amount (IDR)")
        .setPlaceholder("e.g. 15000")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const descInput = new TextInputBuilder()
        .setCustomId("outcome_desc")
        .setLabel("Description (Optional)")
        .setPlaceholder("e.g. Bought lunch")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false);

    modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(amountInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(descInput)
    );

    await interaction.showModal(modal);
}

export default outcomeSelectCategory