import { PrefixCommand } from "../../../types/command";


const fin_das: PrefixCommand = {
    name: "fin_das",

    async execute(message) {
        await message.reply("Pong!");
    },
};

export default fin_das;