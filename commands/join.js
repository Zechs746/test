const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('通話に参加します'),

    async execute(client, interaction) {
        const member = await interaction.guild.members.fetch(interaction.user.id);
        const channel = member.voice.channel;

        if (!channel) {
            return interaction.reply({
                content: '先に通話に入ってください',
                ephemeral: true
            });
        }

        joinVoiceChannel({
            adapterCreator: channel.guild.voiceAdapterCreator,
            channelId: channel.id,
            guildId: channel.guild.id,
            selfDeaf: false,
            selfMute: false,
        });

        await interaction.reply('通話に参加しました');
    }
};