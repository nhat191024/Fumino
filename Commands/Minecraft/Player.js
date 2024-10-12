const { SlashCommandBuilder, ChannelType, PermissionFlagsBits, Interaction } = require("discord.js");
const { execute } = require("./StartServer");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('player_count')
        .setDescription('Check the number of players online in the server'),
    async execute(interaction, client) {
        const rconCommand = `mcrcon -H 127.0.0.1 -P 25575 -p ${process.env.RCON_PASSWORD} list`;

        exec(rconCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                interaction.reply('Error checking the number of players online.');
                return;
            }

            if (stderr) {
                console.error(`stderr: ${stderr}`);
                interaction.reply('Error occurred while checking players.');
                return;
            }

            const match = stdout.match(/There are (\d+) of a max of (\d+) players online/);
            if (match) {
                const onlinePlayers = match[1];
                interaction.reply(`There are currently ${onlinePlayers} players online.`);
            } else {
                interaction.reply('Unable to determine the number of players online.');
            }
        });
    }
}
