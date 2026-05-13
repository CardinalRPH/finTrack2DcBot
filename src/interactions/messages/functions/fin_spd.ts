import { EmbedBuilder } from "discord.js";
import { apiFetch } from "../../../libs/apiFetch";
import { MappedResult, spendingType } from "../../../types/API Response/spending";
import { ApiResponseData } from "../../../types/apiResponseData";
import { PrefixCommand } from "../../../types/command";


const fin_spd: PrefixCommand = {
    name: "fin_spd",

    async execute(message) {
        try {
            const { data } = await apiFetch<ApiResponseData<spendingType>>("/spending", {
                headers: {
                    "x-discord-id": message.author.id
                },
                method: "GET"
            })

            if (!data) {
                return void await message.reply("No spending data found.");
            }

            const embed = new EmbedBuilder()
                .setTitle('📊 Financial Summary (Monthly)')
                .setColor('#3498db')
                .setTimestamp();

            const formatCurrency = (amount: number) =>
                new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumFractionDigits: 0
                }).format(amount);

            const formatList = (results: MappedResult[]) => {
                if (results.length === 0) return "No data";
                return results
                    .map(item => `• **${item.name}**: \`${formatCurrency(item.amount)}\``)
                    .join('\n');
            };

            embed.addFields(
                {
                    name: '📥 Top Income (by Category)',
                    value: formatList(data.byCategory.topIncome),
                    inline: true
                },
                {
                    name: '📤 Top Expense (by Category)',
                    value: formatList(data.byCategory.topExpense),
                    inline: true
                },
                { name: '\u200B', value: '\u200B', inline: false }
            );

            embed.addFields(
                {
                    name: '🏦 Income via Wallet',
                    value: formatList(data.byWallet.topIncome),
                    inline: true
                },
                {
                    name: '💳 Expense via Wallet',
                    value: formatList(data.byWallet.topExpense),
                    inline: true
                }
            );

            return void await message.reply({ embeds: [embed] });
        } catch (error) {
            console.error("Spending Fetch Error:", error);
            return void await message.reply("An error occurred while loading your spendings.");
        }
    },
};

export default fin_spd;