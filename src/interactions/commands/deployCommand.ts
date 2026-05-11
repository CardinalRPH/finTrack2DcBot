import dotenv from "dotenv";

dotenv.config();

import { REST, Routes } from "discord.js";
import { commands } from ".";


const rest = new REST({ version: "10" })
    .setToken(process.env.DISCORD_TOKEN!);

const deployCommands = async () => {
    try {

        await rest.put(
            Routes.applicationCommands(
                process.env.CLIENT_ID!
            ),

            {
                body: commands.map((cmd) => cmd.data.toJSON()),
            }
        );

        console.log("Commands deployed");

    } catch (error) {
        console.error(error);
    }
}

export default deployCommands