const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('メッセージを削除します')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('削除数')
                .setRequired(true)),
        
    async execute(client, interaction) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === 'clear') {
            const amount = interaction.options.getInteger('amount');

            const messages = await interaction.channel.bulkDelete(amount, true);

            await interaction.reply({
                content: `${messages.size}件削除しました`,
                ephemeral: true
            });
        }
    }
}