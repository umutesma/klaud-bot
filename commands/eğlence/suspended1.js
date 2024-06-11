const Discord = require('discord.js');

module.exports = {
	name: 'orospucocu',
	//description: 'Gaygod',
	execute(message, args) {
    var rating = Math.floor(Math.random() * 100) + 1;
    const embed1 = new Discord.MessageEmbed()
        .setTitle("%" + rating + " orospu evladısın :partying_face:")
    message.channel.send(embed1);
	},
};
