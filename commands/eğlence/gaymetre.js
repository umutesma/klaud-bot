const Discord = require('discord.js');

module.exports = {
	name: 'gaymetre',
	description: 'gaymetre',
	execute(message, args) {
    var rating = Math.floor(Math.random() * 100) + 1;
    const embed2 = new Discord.MessageEmbed()
        .setTitle("%" + rating + " gaysin  :sunglasses:")
    message.channel.send(embed2);
	},
};
/*ARCHIVED*/
