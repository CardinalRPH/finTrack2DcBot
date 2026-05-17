import {
    ChatInputCommandInteraction,
    Message,
    SlashCommandBuilder,
    SlashCommandOptionsOnlyBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

export interface Command {
    data: | SlashCommandBuilder
    | SlashCommandOptionsOnlyBuilder
    | SlashCommandSubcommandsOnlyBuilder;

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