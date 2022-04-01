import Discord, { Intents } from 'discord.js';
import 'dotenv/config'
import handleSlashCommand from './utils/SlashCommandHandler'

const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES] });

handleSlashCommand(client);
(client);

client.login(process.env.TOKEN);