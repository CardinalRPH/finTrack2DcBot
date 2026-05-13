import { EmbedBuilder } from "discord.js";
import { apiFetch } from "../../../libs/apiFetch";
import { dashboardType } from "../../../types/API Response/dashboard";
import { ApiResponseData } from "../../../types/apiResponseData";
import { PrefixCommand } from "../../../types/command";
import formatToRupiah from "../../../utils/formatToRupiah";


const fin_das: PrefixCommand = {
    name: "fin_das",

    async execute(message) {
        try {
            const { data } = await apiFetch<ApiResponseData<dashboardType>>("/dashboard", {
                headers: {
                    "x-discord-id": message.author.id
                },
                method: "GET"
            })

            if (!data) {
                return void await message.reply("Dashboard data not found.");
            }

            const dashboardEmbed = new EmbedBuilder()
                .setTitle('🚀 Financial Dashboard')
                .setColor('#6366f1')
                .setDescription(`Welcome back, <@${message.author.id}>! Here is your financial overview.`)
                .setTimestamp();

            // 1. Summary Section (High-level Stats)
            dashboardEmbed.addFields(
                { name: '💰 Total Balance', value: `\`${formatToRupiah(data.totalBalance)}\``, inline: true },
                { name: '📈 Total Investment', value: `\`${formatToRupiah(data.totalInvest)}\``, inline: true },
                { name: '\u200B', value: '\u200B', inline: true }, // Spacer
                { name: '📥 Monthly Income', value: `\`${formatToRupiah(data.monthlyIncome)}\``, inline: true },
                { name: '📤 Monthly Outcome', value: `\`${formatToRupiah(data.monthlyOutcome)}\``, inline: true },
                { name: '\u200B', value: '\u200B', inline: true } // Spacer
            );

            let transactionText = "No recent transactions.";

            if (data.recentTransactions && data.recentTransactions.length > 0) {
                transactionText = data.recentTransactions.map(tx => {
                    const icon = tx.type === 'INCOME' ? '➕' : '➖';
                    const category = tx.category?.name || tx.investment?.assetName || 'General';
                    const wallet = tx.toWallet?.name || 'Unknown Wallet';

                    return `${icon} **${formatToRupiah(tx.amount)}** | ${category}\n*${tx.description || 'No description'} (${wallet})*`;
                }).join('\n\n');
            }

            dashboardEmbed.addFields({
                name: '🕒 Recent Transactions',
                value: transactionText.length > 1024 ? transactionText.substring(0, 1021) + "..." : transactionText
            });

            return void await message.reply({ embeds: [dashboardEmbed] });
        } catch (error) {
            console.error("Dashboard Fetch Error:", error);
            return void await message.reply("An error occurred while loading your dashboard.");
        }
    },
};

export default fin_das;

