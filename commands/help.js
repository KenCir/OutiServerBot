const { Client, Message, MessageEmbed } = require('discord.js');
const admins = require('../dat/admin.json');

module.exports = {
  info: {
    name: "help",
    description: "コマンドの詳細を表示します",
    usage: "[command]",
    aliases: [""],
    owneronly: false,
    adminonly: false,
    category: 'Main'
  },

  /**
   * @param {Message} message
   * @param {Client} client
   */

  run: async function (client, message, args) {
    if (!args[0]) {
      const main = client.commands.filter(x => x.info.category == 'Main').map((x) => '`' + x.info.name + '`').join(', ');
      const admin = client.commands.filter(x => x.info.category == 'Admin').map((x) => '`' + x.info.name + '`').join(', ');
      const owner = client.commands.filter(x => x.info.category == 'Owner').map((x) => '`' + x.info.name + '`').join(', ');
      let embeds = [];
      embeds.push(
        new MessageEmbed()
          .setTitle(`${client.user.tag} helpページ`)
          .addField('Main', main)
          .addField('Money', money)
          .addField('Casino', casino)
          .setColor('RANDOM')
          .setTimestamp()
      );
      embeds.push(
        new MessageEmbed()
          .setTitle('main')
          .setDescription('```' + client.commands.filter(x => x.info.category == 'Main').map((x) => `${process.env.PREFIX}${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
          .setColor('RANDOM')
          .setTimestamp()
      );
      if (admins.includes(message.author.id)) {
        embeds[0].addField('Admin', admin);
        embeds.push(
          new MessageEmbed()
            .setTitle('Admin')
            .setDescription('```' + client.commands.filter(x => x.info.category == 'Admin').map((x) => `${process.env.PREFIX}${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
            .setColor('RANDOM')
            .setTimestamp()
        );
      }
      if (message.author.id === process.env.OWNERID) {
        embeds[0].addField('Owner', owner);
        embeds.push(
          new MessageEmbed()
            .setTitle('Owner')
            .setDescription('```' + client.commands.filter(x => x.info.category == 'Owner').map((x) => `${process.env.PREFIX}${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
            .setColor('RANDOM')
            .setTimestamp()
        );
      }
      const msg = await message.channel.send('```' + `1/${embeds.length}ページ目を表示中\nみたいページ番号を発言してください\n0を送信するか30秒経つと処理が止まります` + '```', embeds[0]);
      while (true) {
        const filter = msg => msg.author.id === message.author.id;
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000 });
        const response = collected.first();
        if (!response) {
          msg.edit('');
          break;
        }
        if (response.content === '0') {
          response.delete();
          msg.edit('');
          break;
        }
        else {
          const selectembed = Number(response.content);
          if (selectembed > 0 && selectembed < embeds.length + 1) {
            response.delete();
            msg.edit('```' + `${selectembed}/${embeds.length}ページ目を表示中\nみたいページ番号を発言してください\n0を送信するか30秒経つと処理が止まります` + '```', embeds[selectembed - 1]);
          }
        }
      }
    }
    else {
      let cmd = args[0]
      let command = client.commands.get(cmd)
      if (!command) command = client.commands.find(x => x.info.aliases.includes(cmd))
      if (!command) {
        message.react('793460058250805259');
        return message.channel.send("そんなコマンドないで。😉");
      }
      let commandinfo = new MessageEmbed()
        .setTitle("コマンド名: " + command.info.name + " の詳細")
        .setColor("RANDOM")
        .setDescription(`コマンド名: ${command.info.name}\n説明: ${command.info.description}\n使用法: \`\`${process.env.PREFIX}${command.info.name} ${command.info.usage}\`\`\nエイリアス: ${command.info.aliases.join(", ")}\n\nカテゴリー: ${command.info.category}BotOwnerコマンド: ${command.info.ownercommand}\nBotAdminコマンド: ${command.info.botadmincommand}`)
      message.channel.send(commandinfo)
    }
  },
};