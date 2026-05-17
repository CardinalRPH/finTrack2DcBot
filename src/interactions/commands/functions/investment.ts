import {
    ApplicationIntegrationType,
    EmbedBuilder,
    InteractionContextType,
    SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../../types/command";
import { apiFetch } from "../../../libs/apiFetch";
import { ApiResponseData } from "../../../types/apiResponseData";
import { investType } from "../../../types/API Response/investment";
import formatToRupiah from "../../../utils/formatToRupiah";


const investment: Command = {
    data: new SlashCommandBuilder()
        .setName("investment")
        .setDescription("Get all of the investment list")
        .setContexts(
            InteractionContextType.BotDM,
        )
        .setIntegrationTypes(
            ApplicationIntegrationType.UserInstall
        ),

    async execute(interaction) {
        try {
            const { data } = await apiFetch<ApiResponseData<investType[]>>("/investment", {
                headers: {
                    "x-discord-id": interaction.user.id
                },
                method: "GET"
            })

            if (!data || data.length === 0) {
                return void await interaction.reply("You don't have any investment registered yet.");
            }

            const investmentEmbed = new EmbedBuilder()
                .setTitle('📈 Investment Portfolio')
                .setDescription('Here is a summary of your current assets:')
                .setColor('#2ecc71')
                .setTimestamp();

            let totalPortfolioValue = 0;

            const fields = data.map(inv => {
                const amount = Number(inv.totalInvestment);
                totalPortfolioValue += amount;

                const formattedAmount = formatToRupiah(amount)

                return {
                    name: `${inv.assetName}`,
                    value: `**Provider:** ${inv.provider}\n**Value:** \`${formattedAmount}\``,
                    inline: true
                };
            });

            investmentEmbed.addFields(fields);

            const formattedTotal = formatToRupiah(totalPortfolioValue)

            investmentEmbed.setFooter({
                text: `Total Portfolio Value: ${formattedTotal}`
            });

            return void await interaction.reply({ embeds: [investmentEmbed] });
        } catch (error) {
            console.error("Investment Fetch Error:", error);
            return void await interaction.reply("An error occurred while loading your investment.");
        }
    },
};

export default investment;