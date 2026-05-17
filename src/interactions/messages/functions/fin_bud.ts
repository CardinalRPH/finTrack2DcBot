import { EmbedBuilder } from "discord.js";
import { apiFetch } from "../../../libs/apiFetch";
import { budgetAvailDate, budgetType } from "../../../types/API Response/budget";
import { ApiResponseData } from "../../../types/apiResponseData";
import { PrefixCommand } from "../../../types/command";
import formatToRupiah from "../../../utils/formatToRupiah";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const fin_bud: PrefixCommand = {
    name: "fin_bud",

    async execute(message) {
        try {
            const args = message.content.slice("!".length).trim().split(/\s+/)

            const commandName = args.shift()?.toLocaleLowerCase();
            const subCommand = commandName?.split("_")[2]

            if (!subCommand) {
                return void await message.reply(`❌ **Missing sub-command!**\n\n**Example usage:**\n• \`!fin_bud_date\` (To check available periods)\n• \`!fin_bud_202605\` (To check budget for May 2026)`);
            }

            if (subCommand === "date") {
                const { data: availDateData } = await apiFetch<ApiResponseData<budgetAvailDate[]>>("/budget/date", {
                    headers: {
                        "x-discord-id": message.author.id
                    },
                    method: "GET"
                })

                if (!availDateData || availDateData.length === 0) {
                    return void await message.reply("📅 No budget periods recorded yet.");
                }

                const dateList = availDateData
                    .map(d => `• \`!fin_bud_${d.year}${String(d.month).padStart(2, '0')}\` (${monthNames[d.month - 1]} ${d.year})`)
                    .join('\n');

                const dateEmbed = new EmbedBuilder()
                    .setTitle('📅 Available Budget Periods')
                    .setDescription(`Click or use one of these commands to view the specific monthly budget:\n\n${dateList}`)
                    .setColor('#e67e22') // Orange color
                    .setTimestamp();

                return void await message.reply({ embeds: [dateEmbed] });
            } else {
                if (!isValidYYYYMM(subCommand)) {
                    return void await message.reply("❌ **Invalid date format!** Please use \`YYYYMM\` format (e.g., \`202605\`).");
                }
                // do budget on valid DDYYMM
                const { data: budgetData } = await apiFetch<ApiResponseData<budgetType>>(`/budget/${subCommand}`, {
                    headers: {
                        "x-discord-id": message.author.id
                    },
                    method: "GET"
                })

                const year = subCommand.slice(0, 4);
                const month = subCommand.slice(4, 6);

                const budgetEmbed = new EmbedBuilder()
                    .setTitle(`📊 Budget Report: ${month}/${year}`)
                    .setColor('#9b59b6') // Purple color
                    .setTimestamp();

                budgetEmbed.addFields(
                    { name: '💰 Total Budget', value: `\`${formatToRupiah(budgetData.totalBudget)}\``, inline: true },
                    { name: '📤 Total Spent', value: `\`${formatToRupiah(budgetData.totalSpent)}\``, inline: true },
                    { name: '🪙 Remaining', value: `\`${formatToRupiah(budgetData.remaining)}\``, inline: true }
                );

                const categoryBreakdown = budgetData.budgetData.map(b => {
                    const percentage = Number(b.amount) > 0 ? Math.round((b.spended / Number(b.amount)) * 100) : 0;

                    const progressBlocks = Math.min(Math.round(percentage / 10), 10);
                    const progressBar = '🟩'.repeat(progressBlocks) + '⬛'.repeat(10 - progressBlocks);

                    return `**${b.category?.name || 'Unknown'}**\nAllocated: ${formatToRupiah(b.amount)} | Spent: ${formatToRupiah(b.spended)} (\`${percentage}%\`)\n${progressBar}`;
                }).join('\n\n');

                budgetEmbed.addFields({
                    name: '🗂️ Breakdown by Category',
                    value: categoryBreakdown.length > 1024 ? categoryBreakdown.substring(0, 1021) + "..." : categoryBreakdown
                });

                return void await message.reply({ embeds: [budgetEmbed] });
            }
        } catch (error) {
            console.error("Budget Error:", error);
            return void await message.reply("⚠️ An error occurred while processing your budget request.");
        }
    },
};

export function isValidYYYYMM(value: string): boolean {

    if (!/^\d{6}$/.test(value)) {
        return false;
    }

    const year = Number(value.slice(0, 4));
    const month = Number(value.slice(4, 6));

    // valid month
    if (month < 1 || month > 12) {
        return false;
    }

    // optional year range
    if (year < 2000 || year > 2100) {
        return false;
    }

    return true;
}

export default fin_bud;