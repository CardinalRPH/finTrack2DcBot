import { Client } from "discord.js";
import prefixCommand from "../interactions/messages";

const PREFIX = "!"
export default (client: Client) => {
    client.on("messageCreate", async (message) => {
        if (message.author.bot) return
        if (message.inGuild()) return

        if(!message.content.startsWith(PREFIX)) return

        const args = message.content.slice(PREFIX.length).trim().split(/\s+/)

        const commandName = args.shift()?.toLocaleLowerCase();

        if(!commandName) return

        const command = prefixCommand.find((cmd)=>cmd.name === commandName)
        
        if(!command) return

        try {
            await command.execute(message, args)
        } catch (error) {
            console.error(error)

            await message.reply("Something went wrong")
        }

        
    })
}

//message prefix is !fin_p <message>
// list message
// !fin_cat = show available categories OK
// !fin_inv = show all invest with value OK
// !fin_wal = show wallet with value OK

// !fin_bud_MMYYYY = show budget with month and year OK
// !fin_bud_date = show list date OK

// !fin_das = show total balance, totalInvest, monthly incom and outcome, recent 5 transactions
// !fin_spd = show top 5 spd by wallet and category

// !fin_help = show help function
// !fin_ping

// !fn_add 20000 makan bca
// !fin_budget 202605
// !fin_transfer 50000 bca jago