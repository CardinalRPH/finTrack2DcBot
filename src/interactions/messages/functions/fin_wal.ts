import { EmbedBuilder } from "discord.js";
import { apiFetch } from "../../../libs/apiFetch";
import { walletEnumType, walletType } from "../../../types/API Response/wallet";
import { ApiResponseData } from "../../../types/apiResponseData";
import { PrefixCommand } from "../../../types/command";
import formatToRupiah from "../../../utils/formatToRupiah";


const fin_wal: PrefixCommand = {
    name: "fin_wal",

    async execute(message) {
        try {
            const { data } = await apiFetch<ApiResponseData<walletType[]>>("/wallet", {
                headers: {
                    "x-discord-id": message.author.id
                },
                method: "GET"
            })

            if (!data || data.length === 0) {
                return void await message.reply("You don't have any wallets registered yet.");
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

            return void await message.reply({ embeds: [walletEmbed] });
        } catch (error) {
            console.error("Wallet Fetch Error:", error);
            return void await message.reply("An error occurred while loading your wallet.");
        }
    },
};

function getWalletEmoji(type: walletEnumType): string {
    switch (type) {
        case "BANK": return "🏦";
        case "E_WALLET": return "💳";
        case "CASH": return "💵";
        default: return "👛";
    }
}

export default fin_wal;