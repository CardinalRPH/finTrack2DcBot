import {
    ApplicationIntegrationType,
    EmbedBuilder,
    InteractionContextType,
    SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../../types/command";
import { walletEnumType, walletType } from "../../../types/API Response/wallet";
import { apiFetch } from "../../../libs/apiFetch";
import { ApiResponseData } from "../../../types/apiResponseData";
import formatToRupiah from "../../../utils/formatToRupiah";


const wallet: Command = {
    data: new SlashCommandBuilder()
        .setName("wallet")
        .setDescription("Get all list wallets")
        .setContexts(
            InteractionContextType.BotDM,
        )
        .setIntegrationTypes(
            ApplicationIntegrationType.UserInstall
        ),

    async execute(interaction) {
        try {
            const { data } = await apiFetch<ApiResponseData<walletType[]>>("/wallet", {
                headers: {
                    "x-discord-id": interaction.user.id
                },
                method: "GET"
            })

            if (!data || data.length === 0) {
                return void await interaction.reply("You don't have any wallets registered yet.");
            }

            const walletEmbed = new EmbedBuilder()
                .setTitle('💰 My Wallets')
                .setDescription('Summary of your current balances:')
                .setColor('#2b2d31')
                .setTimestamp();

            const fields = data.map(wallet => {
                const formattedBalance = formatToRupiah(wallet.balance)

                return {
                    name: `${getWalletEmoji(wallet.type)} ${wallet.name}`,
                    value: `**Balance:** \`${formattedBalance}\`\n`,
                    inline: true
                };
            });

            walletEmbed.addFields(fields);

            const total = data.reduce((acc, curr) => acc + Number(curr.balance), 0);
            const formattedTotal = formatToRupiah(total)

            walletEmbed.setFooter({ text: `Total Balance: ${formattedTotal}` });

            return void await interaction.reply({ embeds: [walletEmbed] });
        } catch (error) {
            console.error("Wallet Fetch Error:", error);
            return void await interaction.reply("An error occurred while loading your wallet.");
        }
    },
};

const getWalletEmoji = (type: walletEnumType): string => {
    switch (type) {
        case "BANK": return "🏦";
        case "E_WALLET": return "💳";
        case "CASH": return "💵";
        default: return "👛";
    }
}

export default wallet;