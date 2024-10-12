const { SlashCommandBuilder, ChannelType, PermissionFlagsBits, Interaction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the Minecraft server'),
    async execute(interaction, client) {
        exec('sudo systemctl stop craftoria.service', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error stopping server: ${error.message}`);
                interaction.reply('Failed to stop the server.');
                return;
            }
            interaction.reply('Minecraft server is stopping...');
            const channel = client.channels.cache.get(process.env.CHANNEL_ID);
            if (channel) {
                channel.send('Minecraft server has stopped!');
            }
        });
    },
};