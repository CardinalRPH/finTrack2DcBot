import { Interaction } from "discord.js"; import createInvestSelectWallet from "./sellectWallet";
import investSelectInvestment from "./sellectInvest";
import investSubmitModal from "./submitModal";

const investHandler = async (interaction: Interaction) => {
    if (interaction.isStringSelectMenu() && interaction.customId === "crinvest_select_wallet") {
        return void await createInvestSelectWallet(interaction);
    }

    if (interaction.isStringSelectMenu() && interaction.customId.startsWith("crinvest_select_inv_")) {
        return void await investSelectInvestment(interaction);
    }

    if (interaction.isModalSubmit() && interaction.customId.startsWith("crinvest_modal_")) {
        return void await investSubmitModal(interaction);
    }
}

export default investHandler