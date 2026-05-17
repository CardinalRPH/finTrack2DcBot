import { EmbedBuilder } from "discord.js";
import { apiFetch } from "../../../libs/apiFetch";
import { investType } from "../../../types/API Response/investment";
import { ApiResponseData } from "../../../types/apiResponseData";
import { PrefixCommand } from "../../../types/command";
import formatToRupiah from "../../../utils/formatToRupiah";


const fin_inv: PrefixCommand = {
    name: "fin_inv",

    async execute(message) {
        try {
            const { data } = await apiFetch<ApiResponseData<investType[]>>("/investment", {
                headers: {
                    "x-discord-id": message.author.id
                },
                method: "GET"
            })

            if (!data || data.length === 0) {
                return void await message.reply("You don't have any investment registered yet.");
            }

            const investmentEmbed = new EmbedBuilder()
                .setTitle('📈 Investment Portfolio')
                .setDescription('Here is a summary of your current assets:')
                .setColor('#2ecc71') // Green color for growth/finance
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

            return void await message.reply({ embeds: [investmentEmbed] });
        } catch (error) {
            console.error("Investment Fetch Error:", error);
            return void await message.reply("An error occurred while loading your investment.");
        }

    },
};

export default fin_inv;