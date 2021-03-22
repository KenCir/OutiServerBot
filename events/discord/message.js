const { Client, Message, MessageEmbed } = require('discord.js');
const textToSpeech = require('@google-cloud/text-to-speech');
const { Readable } = require('stream');
const { Database } = require('../../unko/index');
const db = new Database('unkoserver.db');
const admins = require('../../dat/admin.json');

/**
 * @param {Client} client
 * @param {Message} message
 */

module.exports = async (client, message) => {
  if (message.author.id == "302050872383242240" && message.guild.id === '706452606918066237') {
    if (message.embeds[0].color == "2406327" && message.embeds[0].url == "https://disboard.org/" && (message.embeds[0].description.match(/表示順をアップしたよ/) || message.embeds[0].description.match(/Bump done/) || message.embeds[0].description.match(/Bump effectué/) || message.embeds[0].description.match(/Bump fatto/) || message.embeds[0].description.match(/Podbito serwer/) || message.embeds[0].description.match(/Успешно поднято/) || message.embeds[0].description.match(/갱신했어/) || message.embeds[0].description.match(/Patlatma tamamlandı/))) {
      message.channel.send('Bumpを確認しました、二時間後に通知します');
      setTimeout(() => {
        message.channel.send('Bumpしてから二時間経ちました\n`!d bump` を実行しましょう<:emoji_121:820198227147751474>');
      }, 7200000);
    }
    else if (message.embeds[0].color == "15420513" && message.embeds[0].url == "https://disboard.org/" && (message.embeds[0].description.match(/このサーバーを上げられるようになるまで/) || message.embeds[0].description.match(/あなたがサーバーを上げられるようになるまで/))) {
      const waittime_bump = message.embeds[0].description.split("と")[1].split("分")[0];
      message.channel.send(`Bumpに失敗したようです、${waittime_bump}分後にもう一度もう一度実行してください！<:unkooo:790538555407597590>`);
    }
  }
  else if (message.author.id == "761562078095867916" && message.guild.id === '706452606918066237') {
    if (message.embeds[0].color == "7506394" && message.embeds[0].url == "https://dissoku.net/" && message.embeds[0].fields[0].name.endsWith('をアップしたよ!')) {
      message.channel.send('Upを確認しました、一時間後に通知します');
      setTimeout(() => {
        message.channel.send('Upしてから一時間経ちました\n`/dissoku up!` を実行しましょう<:emoji_121:820198227147751474>');
      }, 3600000);
    }
    else if (message.embeds[0].color == "7506394" && message.embeds[0].url == "https://dissoku.net/" && message.embeds[0].fields[0].value.startsWith('間隔をあけてください')) {
      const waittime_up = message.embeds[0].fields[0].value.split("間隔をあけてください")[1].split('(')[1].split(')')[0];
      message.channel.send(`Upに失敗したようです、${waittime_up}後にもう一度もう一度実行してください！<:unkooo:790538555407597590>`);
    }
  }
  if (!message.guild || message.system || message.author.bot) return;

  yomiage(client, message);

  if (message.channel.name === 'うんこ鯖グローバルチャット' || message.channel.name === 'カスクラグローバルチャット') {
    if (message.attachments.size <= 0) {
      message.delete();
    }
    client.channels.cache.forEach(channel => {
      let username = message.author.tag;
      if (message.member.nickname) username = message.member.nickname + `(${message.author.tag})`;
      if (message.attachments.size <= 0) {
        const embed = new MessageEmbed()
          .setAuthor(username, message.author.avatarURL())
          .setDescription(message.content)
          .setColor('RANDOM')
          .setFooter(message.guild.name + ' | ' + message.channel.name, message.guild.iconURL())
          .setTimestamp()
        if (channel.name === 'うんこ鯖グローバルチャット' || channel.name === 'カスクラグローバルチャット') {
          channel.send(embed)
        }
      }
      if (!message.attachments.forEach(attachment => {
        const embed = new MessageEmbed()
          .setAuthor(username, message.author.avatarURL())
          .setImage(attachment.url)
          .setDescription(attachment.url)
          .setColor('RANDOM')
          .setFooter(message.guild.name + ' | ' + message.channel.name, message.guild.iconURL())
          .setTimestamp()
        if (channel.name === 'うんこ鯖グローバルチャット' || channel.name === 'カスクラグローバルチャット') {
          channel.send(embed)
        }
      }));
    });
  }

  if (message.channel.id === '706469264638345227') {
    message.react('👍');
    message.react('👎');
  }

  let usermoneydata = db.MoneyGet(message.author.id, message.guild.id);
  let userdailydata = db.DailyGet(message.author.id, message.guild.id);

  if (usermoneydata.ticket === null) {
    usermoneydata.ticket = 0;
  }
  else if (usermoneydata.tuna === null) {
    usermoneydata.tuna = 0;
  }

  db.MoneySet(usermoneydata);
  db.DailySet(userdailydata);

  if (message.channel.parentID === '801057223139917884') {
    message.member.roles.add('801796340057112589');
  }

  const URL_PATTERN = /http(?:s)?:\/\/(?:.*)?discord(?:app)?\.com\/channels\/(?:\d{17,19})\/(?<channelId>\d{17,19})\/(?<messageId>\d{17,19})/g;
  let result;
  while ((result = URL_PATTERN.exec(message.content)) !== null) {
    const group = result.groups;
    client.channels.fetch(group.channelId)
      .then(channel => channel.messages.fetch(group.messageId))
      .then(targetMessage => message.channel.send(targetMessage.author.username + 'のメッセージを展開します\n\n',
        new MessageEmbed()
          .setDescription(targetMessage.cleanContent)
          .setColor('RANDOM')
          .setTimestamp()))
      .catch(error => message.reply(error)
        .then(message => message.delete({ timeout: 10000 }))
        .catch(console.error)
      );
  }

  if (!message.content.startsWith(process.env.PREFIX)) return;
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (!command) return;
  const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.info.aliases && cmd.info.aliases.includes(command));
  if (!cmd) {
    message.react('793460058250805259');
    return message.reply('そんなコマンドないで。😉');
  }
  else if (cmd.info.owneronly && message.author.id !== process.env.OWNERID || cmd.info.adminonly && !admins.includes(message.author.id)) {
    message.react('793460058250805259');
    return message.reply('そのコマンドを使う権限が足りてないで。😉');
  }
  cmd.run(client, message, args);
};

async function textToSpeechReadableStream(text) {
  const request = {
    input: { text },
    voice: {
      languageCode: 'ja-JP',
      name: 'ja-JP-Wavenet-A'
    },
    audioConfig: {
      audioEncoding: 'OGG_OPUS',
      speakingRate: 1.2
    }
  };

  const [response] = await textclient.synthesizeSpeech(request);
  const stream = new Readable({ read() { } });
  stream.push(response.audioContent);

  return stream;
}
const textclient = new textToSpeech.TextToSpeechClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }
});

/**
 * @param {Client} client
 * @param {Message} message
 */

async function yomiage(client, message) {
  const guild = message.guild;
  const channel = message.member.voice.channel;
  if (!message.member.voice.selfMute || guild.id !== process.env.DISCORD_GUILD_ID || !channel || message.channel.id !== process.env.DISCORD_SOURCE_CHANNEL_ID) {
    return;
  }
  const text = message
    .content
    .replace(/https?:\/\/\S+/g, 'URL省略')
    .replace(/<a?:.*?:\d+>/g, '絵文字省略')
    .replace(/<@!?.*?>/g, 'メンション省略')
    .replace(/<#.*?>/g, 'メンション省略')
    .replace(/<@&.*?>/g, 'メンション省略')
    .slice(0, 50);
  if (!text) { return; }
  if (channel.members.array().length < 1) { return; }
  const currentConnection = client.voice.connections.get(process.env.DISCORD_GUILD_ID);
  const shouldMove = !currentConnection || currentConnection.channel.id !== channel.id;
  const conn = shouldMove ? await channel.join() : currentConnection;
  conn.play(await textToSpeechReadableStream(text), { highWaterMark: 6, bitrate: 'auto' })
}