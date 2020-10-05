const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
            name: 'boobs',
            category: "nsfw",
            aliases: ["tits", "boob"],
            group: 'nsfw',
            memberName: 'boobs',
            description: 'A Command To View Boobs Images!',
            examples: ["boobs"],
            argsType: "multiple",
            guildOnly: true,
            nsfw: true,
        
    
  run: async (client, message, args) => {
         
             var errMessage = "This is not an NSFW Channel";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

            let body = await fetch(`https://love-you.xyz/api/v2/boobs`).then(url => url.json());
            let nsfwembed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor("RANDOM")
                .setTitle(`Boobs Image For ${message.author.tag}!`)
                .setImage(body.url)
                .setTimestamp()
                .setFooter(message.guild.me.displayName)
            message.channel.send(nsfwembed);
        
  }
}