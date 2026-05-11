import { PrefixCommand } from "../../../types/command";


const fin_bud: PrefixCommand = {
    name: "fin_bud",

    async execute(message) {
        const args = message.content.slice("!".length).trim().split(/\s+/)

        const commandName = args.shift()?.toLocaleLowerCase();
        const monthYear = commandName?.split("_")[2]
        if (!monthYear) {
            await message.reply(`
            Need Year Month

Example:
\`!fin_bud_202605\`
`);
            return
        }
        await message.reply("bud!");
    },
};

export function isValidYYYYMM(value: string): boolean {

    // harus 6 digit
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