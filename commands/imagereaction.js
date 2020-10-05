const Discord = require('discord.js');
const cheerio = require('cheerio');
const request = require('request');

module.exports = {
    run: async(client, message, args) => {

        var args2 = message.content.split(/\s+/g).slice(1).join(" ");
        if (!args2) return message.channel.send('Give me a search result')
           
           var options = {
               url: "http://results.dogpile.com/serp?qc=images&q=" + args.slice(1).join(" "),
               method: "GET",
               headers: {
                   "Accept": "text/html",
                   "User-Agent": "Chrome"
               }
           };
       
         
           request(options, async function(error, response, responseBody) {
               if (error) {
                   return;
               }
               $ = cheerio.load(responseBody);
           
               var links = $(".image a.link");
               
              
               var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
              
               if (!urls.length) {
                   return message.channel.send("I didn't find anything.");
               }
       
       
               
               let i = 0;
               let max = urls.length - 1;
               
               const embed = new Discord.MessageEmbed()
               .setTitle("Image search: " + args.slice(1).join(" "))
               .setDescription(`Use the reactions to move from one image to another`)
               .setFooter(`${i + 1}/${max + 1}`)
               .setImage(urls[i])
               .setColor("RANDOM")
       
              
               const filter = (reaction, user) => {
                   return ['◀️', '▶️', '⏹️'].includes(reaction.emoji.name) && user.id === message.author.id;
               };
       
               
               let msg = await message.channel.send(embed);
               await msg.react('◀️');
               await msg.react('▶️');
               await msg.react('⏹️');
       
               
               let collector = msg.createReactionCollector(filter, { idle: 20000 })
               collector.on('collect', (reaction) => {
                   
                   if (reaction.emoji.name === '▶️') {
                        reaction.users.filter(x => x.id !== client.user.id).forEach(x => reaction.remove(x.id))
                       if (max !== i){
                           
                           i++
                           embed.setImage(urls[i])
                           embed.setFooter(`${i + 1}/${max + 1}`)
                            msg.edit(embed);
                       }
                   }
                   if (reaction.emoji.name === '◀️') {
                        reaction.users.filter(x => x.id !== client.user.id).forEach(x => reaction.remove(x.id))
                       if (i !== 0) {
                           i--
                           embed.setImage(urls[i])
                           embed.setFooter(`${i + 1}/${max + 1}`)
                            msg.edit(embed);
                       }
                   }
                   if (reaction.emoji.name === '⏹️') {
                       collector.stop();
                   }
               })
              
             
       
           });


    },
    config: {
        name: 'img',
        description: 'Search Image',
        usage: 'img <nameimage>',
        category: 'fun',
        accessableby: 'Members',
        aliases: []
    }
}