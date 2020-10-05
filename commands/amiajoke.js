const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports.run = async(client, message, args) => {
  let user = message.mentions.users.first() || message.author
  let avatar = user.avatarURL({ format: 'png', dynamic: true, size: 2048})
  let m = await message.channel.send("Loading...");
            message.channel.send(`https://api.alexflipnote.dev/amiajoke?image=${avatar}`);
            m.delete({ timeout: 500 }).catch(console.log)
}

module.exports.help = {
  name: "amiajoke",
  category: "fun",
  aliases: ["Amiajoke", "AMIAJOKE"]
}