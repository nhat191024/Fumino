const { SlashCommandBuilder, ChannelType, PermissionFlagsBits, Interaction } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear_messages')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription('delete messages by number in 1 channel or 1 user')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Channel you want to delete messages')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        )

        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Number of messages to delete')
                .setMinValue(1) 
                .setMaxValue(99)
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('user')
                .setDescription('user you want to delete messages')
                .setRequired(false)
        ),
    /**
     * 
     * @param {Interaction} interaction 
     */
    async execute(interaction) {
        const {options} = interaction;

        const channel = options.getChannel('channel');
        const target = options.getUser('user');
        const amount = options.getInteger('amount');

        const messages = await channel.messages.fetch({
            limit: amount + 1,
        });

        if (target) {
            let i = 0;
            const filleted = [];

            (await messages).filter((msg) => {
                if (msg.author.id == target.id && amount < i) {
                    filleted.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filleted).then(messages => {
                interaction.reply({ content: `Successfully deleted ${messages.size} messages from ${target}.`, ephemeral: true});
            })
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                interaction.reply({ content: `Successfully deleted ${messages.size} messages from channel.`,ephemeral: true});
            })
        }
    }
}