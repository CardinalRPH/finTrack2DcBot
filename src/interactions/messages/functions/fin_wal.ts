import { PrefixCommand } from "../../../types/command";


const fin_wal: PrefixCommand = {
    name: "fin_wal",

    async execute(message) {
        await message.reply("Pong!");
    },
};

export default fin_wal;