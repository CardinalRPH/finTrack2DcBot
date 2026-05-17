import { Interaction } from "discord.js";
import transferSelectWallet from "./sellectWallet";
import transferSelectToWallet from "./sellectToWallet";
import transferSubmitModal from "./submitModal";


const outcomeHandler = async (interaction: Interaction) => {
    if (interaction.isStringSelectMenu() && interaction.customId === "transfer_select_wallet") {
        return void await transferSelectWallet(interaction);
    }

    if (interaction.isStringSelectMenu() && interaction.customId.startsWith("transfer_select_toWallet_")) {
        return void await transferSelectToWallet(interaction);
    }

    if (interaction.isModalSubmit() && interaction.customId.startsWith("transfer_modal_")) {
        return void await transferSubmitModal(interaction);
    }
}

export default outcomeHandler