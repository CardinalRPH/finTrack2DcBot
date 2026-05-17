import {
    ApplicationIntegrationType,
    EmbedBuilder,
    InteractionContextType,
    SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../../types/command";
import { apiFetch } from "../../../libs/apiFetch";
import { ApiResponseData } from "../../../types/apiResponseData";
import { MappedResult, spendingType } from "../../../types/API Response/spending";


const spending: Command = {
    data: new SlashCommandBuilder()
        .setName("spending")
        .setDescription("Get spending statistic by categories and wallet")
        .setContexts(
            InteractionContextType.BotDM,
        )
        .setIntegrationTypes(
            ApplicationIntegrationType.UserInstall
        ),

    async execute(interaction) {
        try {
            const { data } = await apiFetch<ApiResponseData<spendingType>>("/spending", {
                headers: {
                    "x-discord-id": interaction.user.id
                },
                method: "GET"
            })

            if (!data) {
                return void await interaction.reply("No spending data found.");
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

            return void await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error("Spending Fetch Error:", error);
            return void await interaction.reply("An error occurred while loading your spendings.");
        }
    },
};

export default spending;