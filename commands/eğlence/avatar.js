const Discord = require('discord.js');
var user = message.mentions.users.first();

module.exports = {
	name: 'avatar',
	description: 'avatar',
	execute(message, args) {
		var member= message.mentions.members.first();
	 	let embed = new Discord.MessageEmbed()
 				.setImage(message.member.avatarURL)
 				.setColor('#275BF0')
		message.channel.send(embed)
	},
};
/*ARCHIVED*/
