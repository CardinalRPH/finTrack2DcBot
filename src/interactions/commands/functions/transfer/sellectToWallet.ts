import { StringSelectMenuInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from "discord.js";

const transferSelectToWallet = async (interaction: StringSelectMenuInteraction) => {
    const walletId = interaction.customId.split("_")[3];
    const toWalletId = interaction.values[0];

    const modal = new ModalBuilder()
        .setCustomId(`transferModal_modal_${walletId}_${toWalletId}`)
        .setTitle("Enter Transaction Details");

    const amountInput = new TextInputBuilder()
        .setCustomId("transfer_amount")
        .setLabel("Amount (IDR)")
        .setPlaceholder("e.g. 15000")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const descInput = new TextInputBuilder()
        .setCustomId("transfer_desc")
        .setLabel("Description (Optional)")
        .setPlaceholder("e.g. For wealth")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false);

    modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(amountInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(descInput)
    );

    await interaction.showModal(modal);
}

export default transferSelectToWallet