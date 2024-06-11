const Discord = require('discord.js');

module.exports = {
	name: 'komutlar',
	aliases: ['komut'],
	//description: 'gaymetre',
	execute(message, args) {
    const embed5 = new Discord.MessageEmbed()
        .setTitle("Komutlar")
        .setDescription("Komutları çalıştırmak için * koymanız gerekmektedir")
				.addField("Eğlence Komutları", "----------------------------")
				.addField("kaccm", "Penis boyunuzu söyler")
				.addField("gaymetre", "Yüzde kaç gay olduğunuzu söyler")
				.addField("flood", "Rastgele bir flood atar")
				.addField("gaygod", "Günün gaygodunu gösterir")
				.setColor('#8A2BE2')
    message.channel.send(embed5);
	},
};
/*ARCHIVED*/
