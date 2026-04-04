require('dotenv').config();
const { REST, Routes } = require('discord.js');
const { clientId, guildIds, guildId } = require('./config.json');
const fs = require('node:fs');

const targetGuildId = guildIds?.[0] ?? guildId;
if (!targetGuildId) {
    throw new Error('config.json に guildIds または guildId を設定してください');
}

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (command && command.data) {
        commands.push(command.data.toJSON());
    } else {
        console.error(`Error in ${file}: Missing data or export`);
    }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        //console.log(`Started refreshing ${commands.length} application (/) commands.`);
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, targetGuildId),
            { body: commands },
        );
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
