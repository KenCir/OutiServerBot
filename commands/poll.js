const { Message, MessageEmbed } = require("discord.js");

module.exports = {
    info: {
      name: "poll",
      description: "投票を作る",
      usage: "[タイトル] [選択肢]",
      aliases: [""],
      botownercommand: false,
      botadmincommand: false
    },
/**
 * @param {Message} message
 */
    run: async function(client, message, args) {
        const [title, ...choices] = args
        if (!title){
          return message.channel.send('タイトルを指定してください')
        } 
        const emojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿']
        if (choices.length < 2 || choices.length > emojis.length){
          return message.channel.send(`選択肢は2から${emojis.length}つを指定してください`)
        }
        const poll = await message.channel.send(`${message.author.tag}が作成した投票です`,
          new MessageEmbed()
          .setTitle(title)
          .setDescription(choices.map((c, i) => `${emojis[i]} ${c}`).join('\n'))
          .setColor('RANDOM')
        )
        emojis.slice(0, choices.length).forEach(emoji => poll.react(emoji))
    },
};