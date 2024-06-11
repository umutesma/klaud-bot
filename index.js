const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

const token = /*PRIVATE-1*/;

const prefix = '*';

const userID = '322032528460611604';

const embed = new Discord.MessageEmbed()
    .setTitle("hem")
    .setColor('#8A2BE2')

client.on('guildMemberAdd', async member =>
{
  let guild = Client.guilds.cache.get('389126453309997059')
  let role = guild.roles.cache.get("544064000573308928")

  await member.roles.add(role.id)
})

client.on('ready', () => // Logs
{
    console.log('This bot is online!');
    console.log(`Currently in ${client.guilds.cache.size} servers`);
    client.user.setActivity("Yardım için '*komutlar'", { type: 'PLAYING' });
})

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}


client.on('message', message=> // Commands
{
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  //if (!client.commands.has(commandName)) return;


	try {
		command.execute(message, args, commandName, client, Discord);
	} catch (error) {
		console.error(error);
		message.reply('Bir sorun oluştu');
	}

});

client.on('message', message=> // Commands
{
    if (message.content.toLowerCase() == 'umut') message.channel.send('umut meşgul canım bana söyle')
    if (message.content.toLowerCase() == 'falcon') message.channel.send('Yaralı')
    if (message.content.toLowerCase() == 'bartu') message.channel.send('aslan yelesi saçlım :heart_exclamation:')
    if (message.content.toLowerCase() == 'buse') message.channel.send('elit kekoyum limonlu soda içiyorum')
    if (message.content.includes(userID)) message.channel.send("uyuyom şuan cevap veremem")

});

client.on("message", function(message) {
    if (message.author.id === userID)
        if (message.content == 'ayşe')
            message.channel.send(':heartpulse:')
});

client.login(token);
