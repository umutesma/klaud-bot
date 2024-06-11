const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()
    .setTitle("Bu bot MAKRO sunucusuna özel olarak yazılmıştır. Yardım için '*komutlar'")
    .setColor('#8A2BE2')


module.exports = {
	name: 'yapımcı',
	description: 'Yapımcıyı belirtir',
	execute(message, args) {
		message.channel.send(embed);
	},
};
