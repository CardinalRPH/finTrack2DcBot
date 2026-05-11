import { PrefixCommand } from "../../../types/command";


const fin_inv: PrefixCommand = {
    name: "fin_inv",

    async execute(message) {
        await message.reply("Pong!");
    },
};

export default fin_inv;