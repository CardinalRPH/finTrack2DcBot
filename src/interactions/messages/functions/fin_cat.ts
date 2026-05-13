import { EmbedBuilder } from "discord.js";
import { apiFetch } from "../../../libs/apiFetch";
import { categoryType } from "../../../types/API Response/categories";
import { ApiResponseData } from "../../../types/apiResponseData";
import { PrefixCommand } from "../../../types/command";


const fin_cat: PrefixCommand = {
    name: "fin_cat",

    async execute(message) {
        try {
            const { data } = await apiFetch<ApiResponseData<categoryType[]>>("/categories", {
                headers: {
                    "x-discord-id": message.author.id
                },
                method: "GET"
            })

            if (!data || data.length === 0) {
                return void await message.reply("No categories found.");
            }

            const categoryList = data.map(cat => `• ${cat.name}`).join('\n');

            const categoryEmbed = new EmbedBuilder()
                .setTitle('📋 Available Categories')
                .setDescription(categoryList || 'No categories available')
                .setColor('#2b2d31');


            return void message.reply({ embeds: [categoryEmbed] });
        } catch (error) {
            console.error("Category Fetch Error:", error);
            return void await message.reply("An error occurred while loading your categories.");
        }
    },
};

export default fin_cat;