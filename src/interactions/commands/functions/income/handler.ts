import { Interaction } from "discord.js";
import incomeSelectWallet from "./selectWallets";
import incomeSelectCategory from "./selectCategory";
import incomeSubmitModal from "./submitModal";

const incomeHandler = async (interaction: Interaction) => {
    if (interaction.isStringSelectMenu() && interaction.customId === "income_select_wallet") {
        return void await incomeSelectWallet(interaction);
    }

    if (interaction.isStringSelectMenu() && interaction.customId.startsWith("income_select_cat_")) {
        return void await incomeSelectCategory(interaction);
    }

    if (interaction.isModalSubmit() && interaction.customId.startsWith("income_modal_")) {
        return void await incomeSubmitModal(interaction);
    }
}

export default incomeHandler