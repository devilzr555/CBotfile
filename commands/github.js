// Made by Zukii
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');
const moment = require('moment');
exports.run = async(client, message, args, guildConf) => {
try {
// Made by Zukii
    if (!args[0]) return message.channel.send({
        embed:{
            description: `**Please Give Me A Github Username!**`
        }
    })
// Made by Zukii
    fetch(`https://api.github.com/users/${args.join('-')}`)
      .then(res => res.json()).then(body => {
        if(body.message) return message.channel.send({
            embed:{
                description: ` **User Not Found | Please Give Me A Valid Username!**`
            }
        });
      let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;
  
              const embed = new MessageEmbed()
              .setAuthor(`${login} Information!`, avatar_url)
              .setColor(`#211F1F`)
              .setThumbnail(`${avatar_url}`)
              .addField(`Username`, `${login}`)
              .addField(`ID`, `${id}`)
              .addField(`Bio`, `${bio || "No Bio"}`)
              .addField(`Public Repositories`, `${public_repos || "None"}`, true)
              .addField(`Followers`, `${followers}`, true)
              .addField(`Following`, `${following}`, true)
              .addField(`Location`, `${location || "No Location"}`)
              .addField(`Account Created`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))
              .setFooter(client.user.username, client.user.displayAvatarURL())
              .setTimestamp()
              message.channel.send(embed)

      })
  // Made by Zukii
          } catch (error) {
              console.log(`[Commands] [github] Getting Error In github Command :\n`, error);
              return message.channel.send(`Something Went Wrong Try Again Later!`)
          };
        }
  module.exports.help = {
    name: "github",
    description: "Search Github Repository / Github Profile user",
    dm: false,
    aliases: ["package"]
}



// Made by Zukii