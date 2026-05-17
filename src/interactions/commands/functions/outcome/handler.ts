import { Interaction } from "discord.js";
import outcomeSelectWallet from "./sellectWallet";
import outcomeSelectCategory from "./selectCategory";
import outcomeSubmitModal from "./submitModal";

const outcomeHandler = async (interaction: Interaction) => {
    if (interaction.isStringSelectMenu() && interaction.customId === "outcome_select_wallet") {
        return void await outcomeSelectWallet(interaction);
    }

    if (interaction.isStringSelectMenu() && interaction.customId.startsWith("outcome_select_cat_")) {
        return void await outcomeSelectCategory(interaction);
    }

    if (interaction.isModalSubmit() && interaction.customId.startsWith("outcome_modal_")) {
        return void await outcomeSubmitModal(interaction);
    }
}

export default outcomeHandler