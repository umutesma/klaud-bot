const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const embed = new Discord.MessageEmbed()
    .setTitle('Sesli bir kanala katılmanız gerek')

const embed1 = new Discord.MessageEmbed()
    .setTitle('Gerekli yetkilere sahip değilsin')

const embed2 = new Discord.MessageEmbed()
    .setTitle('Doğru kullanım: ?oynat <link> veya ?oynat <şarkı adı>')

const embed3 = new Discord.MessageEmbed()
    .setTitle('Video bulunamadı')

const embed4 = new Discord.MessageEmbed()
    .setTitle('Bağlantıda bir sorun oluştu')

const embed7 = new Discord.MessageEmbed()
    .setTitle(`Sırada başka şarkı yok`)

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map();

module.exports = {
    name: 'oynat',
    aliases: ['geç', 'durdur'], //We are using aliases to run the skip and stop command follow this tutorial if lost: https://www.youtube.com/watch?v=QBUJ3cdofqc
    cooldown: 0,
    description: 'Advanced music bot',
    async execute(message, args, commandName, client, Discord){


        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send(embed);
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send(embed1);
        if (!permissions.has('SPEAK')) return message.channel.send(embed1);

        //This is our server queue. We are getting this server queue from the global queue.
        const server_queue = queue.get(message.guild.id);

        //If the user has used the play command
        if (commandName === 'oynat'){
            if (!args.length) return message.channel.send(embed2);
            let song = {};

            //If the first argument is a link. Set the song object to have two keys. Title and URl.
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url }
                } else {
                     message.channel.send(embed3);
                }
            }

            //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
            if (!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }

                //Add our key and value pair into the global queue. We then use this to get our server queue.
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);

                //Establish a connection and play the song with the vide_player function.
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send(embed4);
                    throw err;
                }
            } else{
              const embed5 = new Discord.MessageEmbed()
                  .setTitle(`👍 **${song.title}** sıraya eklendi`)
                server_queue.songs.push(song);
                return message.channel.send(embed5);
            }
        }

        else if(commandName === 'geç') skip_song(message, server_queue);
        else if(commandName === 'durdur') stop_song(message, server_queue);
    }

}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
    .on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    const embed6 = new Discord.MessageEmbed()
        .setTitle(`🎶 **${song.title}** şimdi oynatılıyor.`)
    await song_queue.text_channel.send(embed6)
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send(embed);
    if(!server_queue){
        return message.channel.send(embed7);
    }
    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send(embed);
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}
