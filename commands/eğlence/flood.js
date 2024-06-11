const Discord = require('discord.js');

module.exports = {
	name: 'flood',
	//description: 'Gaygod',
	execute(message, args) {
    const REP = require("../../text.json");
    const item = REP[Math.floor(Math.random() * REP.length)];
    //message.channel.send(item.flood);
		const embed = new Discord.MessageEmbed()
        .setDescription(item.flood)
    message.channel.send(embed);
	},
};
/*ARCHIVED*/
