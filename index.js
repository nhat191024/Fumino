const {Client, GatewayIntentBits, Collection} = require('discord.js');
const colors = require("colors");
const dotenv = require('dotenv');

dotenv.config();

const fumino = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildWebhooks,  
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.MessageContent,
    ],
});

try {
  const stringlength2 = 69;
  console.log("\n")
  console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.blue);
  console.log(`     ┃ `.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.blue)
  console.log(`     ┃ `.bold.blue + `Now Start Running Bot`.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `Now Start Running Bot`.length) + "┃".bold.blue)
  console.log(`     ┃ `.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.blue)
  console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.blue)
  console.log(`\n`);
} catch (err) { console.log(err) }

fumino.commands = new Collection;

async function requirehandlers(){
    for await (const handler of[
      "Events",
      "Commands",
      "AntiCrash",
      "DeployCommand"
    ]) {
      try{
        await require(`./Handlers/${handler}`)(fumino);
      }catch(e){console.log(e)}
    }
  }
  requirehandlers();

fumino.login(process.env.DISCORD_TOKEN);