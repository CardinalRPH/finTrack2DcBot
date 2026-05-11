import { PrefixCommand } from "../../../types/command";


const fin_help: PrefixCommand = {
    name: "fin_help",

    async execute(message) {
        await message.reply("Pong!");
    },
};

export default fin_help;