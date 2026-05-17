import {
    ApplicationIntegrationType,
    EmbedBuilder,
    InteractionContextType,
    SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../../types/command";
import { apiFetch } from "../../../libs/apiFetch";
import { ApiResponseData } from "../../../types/apiResponseData";
import { prompType } from "../../../types/API Response/prompt";
import formatToRupiah from "../../../utils/formatToRupiah";


const prompt: Command = {
    data: new SlashCommandBuilder()
        .setName("prompt")
        .setDescription("Create your record with text")
        .setContexts(
            InteractionContextType.BotDM,
        )
        .setIntegrationTypes(
            ApplicationIntegrationType.UserInstall
        )
        .addStringOption(option =>
            option
                .setName("text")
                .setDescription("The transaction details (e.g., bought fried rice for 15000 using gopay)")
                .setRequired(true)
        ),

    async execute(interaction) {
        try {

            const args = interaction.options.getString("text", true).trim();

            if (!args) {
                return void await interaction.reply({
                    content: "❌ Please provide transaction details.",
                    ephemeral: true
                });
            }

            const { data } = await apiFetch<ApiResponseData<prompType>>("/parse", {
                headers: {
                    "x-discord-id": interaction.user.id
                },
                method: "POST",
                body: JSON.stringify({ text: args })
            })

            if (!data) {
                return void await interaction.reply("❌ AI failed to parse your transaction. Please try using clearer sentences.");
            }

            const isIncome = data.type === 'INCOME';
            const embedColor = data.isInvestment ? '#2ecc71' : (isIncome ? '#2ecc71' : '#e74c3c');
            const mainIcon = data.isInvestment ? '📈' : (isIncome ? '📥' : '📤');

            const receiptEmbed = new EmbedBuilder()
                .setTitle(`${mainIcon} Transaction Successfully Logged!`)
                .setDescription(`AI has successfully parsed and recorded your prompt: *"${args}"*`)
                .setColor(embedColor)
                .setTimestamp(new Date(data.date));


            receiptEmbed.addFields(
                { name: '💰 Amount', value: `**\`${formatToRupiah(data.amount)}\`**`, inline: true },
                { name: '👛 Source Wallet', value: `\`${data.wallet.name}\` (${data.wallet.type})`, inline: true }
            );


            if (data.toWallet) {
                receiptEmbed.addFields(
                    { name: '🔄 Destination Wallet', value: `\`${data.toWallet.name}\` (${data.toWallet.type})`, inline: true }
                );
            } else {
                receiptEmbed.addFields({ name: '\u200B', value: '\u200B', inline: true }); // Spacer jika tidak ada toWallet
            }


            if (data.isInvestment && data.investment) {
                receiptEmbed.addFields(
                    { name: '🏢 Provider', value: data.investment.provider, inline: true },
                    { name: '📦 Asset Name', value: data.investment.assetName, inline: true },
                    { name: '📊 Total Invested', value: `\`${formatToRupiah(data.investment.totalInvestment)}\``, inline: true }
                );
            }

            else if (data.category) {
                receiptEmbed.addFields(
                    { name: '🗂️ Category', value: data.category.name, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: '\u200B', value: '\u200B', inline: true }
                );
            }


            receiptEmbed.addFields({
                name: '📝 Description',
                value: data.description || '*No additional notes*'
            });


            const walletInfo = `Wallet Balance: ${formatToRupiah(data.wallet.balance)}`;
            const toWalletInfo = data.toWallet ? ` | Dest Balance: ${formatToRupiah(data.toWallet.balance)}` : '';
            receiptEmbed.setFooter({ text: `${walletInfo}${toWalletInfo}` });

            return void await interaction.reply({ embeds: [receiptEmbed] });
        } catch (error) {
            console.error("Prompt Fetch Error:", error);
            return void await interaction.reply("An error occurred while loading your prompt.");
        }
    },
};

export default prompt;