import {
    ApplicationIntegrationType,
    EmbedBuilder,
    InteractionContextType,
    SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../../types/command";
import { apiFetch } from "../../../libs/apiFetch";
import { ApiResponseData } from "../../../types/apiResponseData";
import { categoryType } from "../../../types/API Response/categories";


const categories: Command = {
    data: new SlashCommandBuilder()
        .setName("categories")
        .setDescription("Get all of the categories")
        .setContexts(
            InteractionContextType.BotDM,
        )
        .setIntegrationTypes(
            ApplicationIntegrationType.UserInstall
        ),

    async execute(interaction) {
        try {
            const { data } = await apiFetch<ApiResponseData<categoryType[]>>("/categories", {
                headers: {
                    "x-discord-id": interaction.user.id
                },
                method: "GET"
            })

            if (!data || data.length === 0) {
                return void await interaction.reply("No categories found.");
            }

            const categoryList = data.map(cat => `• ${cat.name}`).join('\n');

            const categoryEmbed = new EmbedBuilder()
                .setTitle('📋 Available Categories')
                .setDescription(categoryList || 'No categories available')
                .setColor('#2b2d31');


            return void interaction.reply({ embeds: [categoryEmbed] });

        } catch (error) {
            console.error("Category Fetch Error:", error);
            return void await interaction.reply("An error occurred while loading your categories.");
        }
    },
};

export default categories;