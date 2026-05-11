import { PrefixCommand } from "../../../types/command";


const fin_ping: PrefixCommand = {
    name: "fin_ping",

    async execute(message) {
        await message.reply("Pong!");
    },
};

export default fin_ping;