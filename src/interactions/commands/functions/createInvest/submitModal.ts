import { ModalSubmitInteraction } from "discord.js";
import formatToRupiah from "../../../../utils/formatToRupiah";
// import { apiFetch } from "../../../libs/apiFetch";

const investSubmitModal = async (interaction: ModalSubmitInteraction) => {
    try {
        await interaction.deferReply({ ephemeral: true });

        const [, , walletId, investId] = interaction.customId.split("_");
        const amount = interaction.fields.getTextInputValue("crinvest_amount");
        const description = interaction.fields.getTextInputValue("crinvest_desc") || null;

        if (isNaN(Number(amount))) {
            return void await interaction.editReply("❌ Invalid amount! Please enter numbers only.");
        }

        // Contoh integrasi POST ke API Next.js kamu:
        // await apiFetch("/record", {
        //     method: "POST",
        //     headers: { "x-discord-id": interaction.user.id },
        //     body: JSON.stringify({ type: "OUTCOME", walletId, categoryId, amount, description })
        // });

        await interaction.editReply(`✅ **Investment Successfully Saved!**\n\n💰 Amount: **\`${formatToRupiah(amount)}\`**\n📝 Notes: *${description || '-'}*`);

    } catch (error) {
        console.error(error);
        await interaction.editReply("❌ An error occurred while saving the transaction.");
    }
}

export default investSubmitModal