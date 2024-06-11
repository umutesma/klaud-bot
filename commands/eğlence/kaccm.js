const Discord = require('discord.js');
const channelID = '833137267282935838';

module.exports = {
	name: 'kaccm',
	//description: 'Gaygod',
	execute(message, args) {
    var penissize = Math.floor(Math.random() * 25) + 1;
    const embed = new Discord.MessageEmbed()
        .setTitle(penissize + " cm  :eggplant:")
				.setColor('#8A2BE2')
				message.channel.send(embed);
	},
};
/*ARCHIVED*/
