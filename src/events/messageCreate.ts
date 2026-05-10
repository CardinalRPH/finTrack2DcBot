import { Client } from "discord.js";

export default (client: Client) => {
    client.on("messageCreate", (message) => {
        if (message.inGuild()) {
            // return false with emp
        }

    })
}

//message prefix is !fin_p <message> 
// list message 
// !fin_cat = show available categories
// !fin_inv = show all invest with value
// !fin_wal = show wallet with value
// !fin_bud_MMYYYY = show budget with month and year

// !fin_das = show total balance, totalInvest, monthly incom and outcome, recent 5 transactions
// !fin_spd = show top 5 spd by wallet and category

// !fin_help = show help function
