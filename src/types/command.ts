import {
    ChatInputCommandInteraction,
    Message,
    SlashCommandBuilder,
} from "discord.js";

export interface Command {
    data: SlashCommandBuilder;

    execute: (
        interaction: ChatInputCommandInteraction
    ) => Promise<void>;
}

export interface PrefixCommand {
    name: string;

    execute: (
        message: Message,
        args: string[]
    ) => Promise<void>;
}