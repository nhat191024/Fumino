const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const cmds = [];
let dateNow = Date.now();

module.exports = (fumino) => {
    const foldersPath = path.join(__dirname, '../Commands');
    const cmdsFolder = fs.readdirSync(foldersPath);
    for (const folder of cmdsFolder) {
        const cmdPath = path.join(foldersPath, folder);
        const cmdFiles = fs.readdirSync(cmdPath).filter(file => file.endsWith('.js'));
        for (const file of cmdFiles) {
            const filePath = path.join(cmdPath, file);
            const cmd = require(filePath);
            cmds.push(cmd.data.toJSON());
        }
    }

    const rest = new REST().setToken(process.env.DISCORD_TOKEN);

    (async () => {
        try {
            console.log("[x] :: ".magenta + 'Now start deploy slash commands...'.brightYellow)
            const data = await rest.put(
                Routes.applicationCommands(process.env.BOT_ID, process.env.SERVER_ID),
                { body: cmds },
            );
            console.log("[x] :: ".magenta + `Successfully deploy ${cmds.length} slash commands after: `.brightGreen + `${Date.now() - dateNow}ms`.green);
        } catch (error) {
            console.error(error);
        }
    })();
}