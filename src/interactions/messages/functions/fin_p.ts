import { PrefixCommand } from "../../../types/command";


const fin_p: PrefixCommand = {
    name: "fin_p",

    async execute(message) {
        await message.reply("Pong!");
    },
};

export default fin_p;