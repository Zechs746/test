const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('指定したメンバーをサーバーからBANします')
		.addUserOption(option =>
			option.setName('target')
				.setDescription('BANするメンバーを選択してください')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('BANの理由を入力してください'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

	async execute(client, interaction) {
		const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') || '理由なし';

		try {
			await interaction.guild.members.ban(target, { reason: reason });

			const embed = new EmbedBuilder()
				.setColor('#ff0000')
				.setTitle('ユーザーがBANされました')
				.addFields(
					{ name: 'ユーザー', value: `${target.tag} (${target.id})` },
					{ name: '理由', value: reason }
				)
				.setTimestamp();

			await interaction.reply({ embeds: [embed], ephemeral: true });
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: 'BANの処理に失敗しました',
				ephemeral: true
			});
		}
	}
};