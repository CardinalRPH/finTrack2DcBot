import { PrefixCommand } from "../../../types/command";


const fin_spd: PrefixCommand = {
    name: "fin_spd",

    async execute(message) {
        await message.reply("Pong!");
    },
};

export default fin_spd;