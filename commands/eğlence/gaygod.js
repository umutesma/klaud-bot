const Discord = require('discord.js');

module.exports = {
	name: 'gaygod',
	description: 'Gaygod',
	execute(message, args) {
    let randomPer = message.guild.members.cache.random().user;
		message.channel.send("günün gaygodu: <@" + randomPer + ">");
	},
};
/*ARCHIVED*/
