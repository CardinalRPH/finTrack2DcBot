import { PrefixCommand } from "../../../types/command";


const fin_cat: PrefixCommand = {
    name: "fin_cat",

    async execute(message) {
        await message.reply("Pong!");
    },
};

export default fin_cat;