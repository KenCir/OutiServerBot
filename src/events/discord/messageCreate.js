const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const { createAudioPlayer, AudioPlayerStatus, createAudioResource } = require('@discordjs/voice');
const request = require('request');
const { clienterrorlog } = require('../../functions/error');
const { default: axios } = require('axios');
const rpc = axios.create({ baseURL: 'http://localhost:50021', proxy: false });

/**
 * @param {import('../../utils/Bot')} client
 * @param {import('discord.js').Message} message
 */

module.exports = async (client, message) => {
  try {
    if (message.author.id === '786343397807620106') {
      request({
        uri: `https://script.google.com/macros/s/AKfycbweJFfBqKUs5gGNnkV2xwTZtZPptI6ebEhcCU2_JvOmHwM2TCk/exec?text=${encodeURIComponent(message.content)}&source=en&target=ja`,
      },
        async function (err, resource, body) {
          await message.reply(body);
        },
      );
    }
    else if (message.author.id == '302050872383242240') {
      if (message.embeds[0].url == 'https://disboard.org/' && (message.embeds[0].description.match(/表示順をアップしたよ/) || message.embeds[0].description.match(/Bump done/) || message.embeds[0].description.match(/Bump effectué/) || message.embeds[0].description.match(/Bump fatto/) || message.embeds[0].description.match(/Podbito serwer/) || message.embeds[0].description.match(/Успешно поднято/) || message.embeds[0].description.match(/갱신했어/) || message.embeds[0].description.match(/Patlatma tamamlandı/))) {
        message.channel.send(
          {
            embeds: [
              new MessageEmbed()
                .setDescription('Bumpを確認しました、二時間後にこのチャンネルで通知します')
                .setColor('RANDOM')
                .setTimestamp(),
            ],
          },
        ).catch(error => clienterrorlog(error));
        setTimeout(async () => {
          await message.channel.send('Bumpしてから二時間経ちました\n`!d bump` を実行しましょう');
        }, 7200000);
      }
      else if (message.embeds[0].url == 'https://disboard.org/' && (message.embeds[0].description.match(/このサーバーを上げられるようになるまで/) || message.embeds[0].description.match(/あなたがサーバーを上げられるようになるまで/))) {
        const waittime_bump = message.embeds[0].description.split('と')[1].split('分')[0];
        message.channel.send({
          content: `Bumpに失敗したようです、${waittime_bump}分後にもう一度もう一度実行してください！`,
        }).catch(error => clienterrorlog(error));
      }
    }

    if (message.type === 'GUILD_MEMBER_JOIN' && message.guildId === '706452606918066237') {
      client.channels.cache.get('706459931351711775').send(`${message.author}さん、ようこそおうち鯖へ！\nまずは<#872501771254263829>を読みましょう。`);
    }

    if (!message.guild || message.system || message.author.bot) return;

    if (message.channel.id === '706469264638345227') {
      message.react('👍').catch(error => clienterrorlog(error));
      message.react('👎').catch(error => clienterrorlog(error));
    }
    else if (message.channel.id === '914386198489874433') {
      message.react('⚙️').catch(error => clienterrorlog(error));
    }
    else if (message.channel.id === '870145872762126437') {
      message.channel.threads.create(
        {
          name: message.content,
        },
      )
        .then(thread => thread.send({
          content: `${message.author}`,
          embeds: [
            new MessageEmbed()
              .setTitle('スレッドを作成しました！')
              .setDescription(message.content)
              .setColor('RANDOM')
              .setTimestamp(),
          ],
        }))
        .then(msg => msg.pin())
        .catch(error => clienterrorlog(error));
    }
    else if (message.channel.id === '794203640054153237') {
      if (message.attachments.size > 0 || message.content.match(new RegExp('https://')) || message.content.match(new RegExp('http://'))) {
        if (Math.random() < 0.1) {
          const reactions = ['847969092271079425', '917044998065750097', '861635410480463893', '880859874496491540', '917045021662912522'];
          const random = Math.floor(Math.random() * reactions.length);
          message.react(reactions[random]).catch(error => clienterrorlog(error));
        }
        else {
          message.react('♥️').catch(error => clienterrorlog(error));
        }
      }
    }
    else if (message.channelId === '878322897821794414') {
      const msg = await message.reply('ツイートを送信します、よろしいですか？');
      await msg.react('844941572679794688');
      await msg.react('844941573422186497');
      const filter = (reaction, user) => {
        return (reaction.emoji.id === '844941572679794688' || reaction.emoji.id === '844941573422186497') && user.id === message.author.id;
      };
      const collector = msg.createReactionCollector({ filter });
      // eslint-disable-next-line no-unused-vars
      collector.on('collect', async (reaction, user) => {
        try {
          if (reaction.emoji.id === '844941572679794688') {
            const tweet = await client.twitter.post('statuses/update', { status: message.content });
            await message.reply(`ツイートを送信しました\nhttps://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`);
          }
          else { await message.reply('ツイート送信をキャンセルしました'); }

          collector.stop();
        }
        catch (error) {
          clienterrorlog(client, error);
        }
      });
    }
    else if (message.channel.id === '714404103224164423') {
      if (message.attachments.size > 0 || message.content.match(new RegExp('https://')) || message.content.match(new RegExp('http://'))) {
        message.react('👮').catch(error => clienterrorlog(error));
      }
    }

    const URL_PATTERN = /http(?:s)?:\/\/(?:.*)?discord(?:app)?\.com\/channels\/(?:\d{17,19})\/(?<channelId>\d{17,19})\/(?<messageId>\d{17,19})/g;
    let result;
    while ((result = URL_PATTERN.exec(message.content)) !== null) {
      const group = result.groups;
      client.channels.fetch(group.channelId)
        .then(channel => channel.messages.fetch(group.messageId))
        .then(targetMessage => message.reply(
          {
            embeds: [
              new MessageEmbed()
                .setTitle(`${targetMessage.author.username}のメッセージを展開します`)
                .setDescription(targetMessage.cleanContent)
                .setColor('RANDOM')
                .setTimestamp(),
            ],
          },
        ))
        .catch(error => message.reply(error))
        .catch(error => clienterrorlog(error));
    }

    createyomiage(client, message);

    if (!message.content.startsWith(process.env.PREFIX)) return;
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (!command) return;
    const cmd = client.commands.get(command);
    if (!cmd) return;
    else if (cmd.info.category === 'owner' && message.author.id !== process.env.OWNERID) return;
    else if (cmd.info.category === 'admin' && !message.member.permissions.has('ADMINISTRATOR')) return;
    cmd.run_message(client, message, args);
  }
  catch (error) {
    clienterrorlog(client, error);
  }
};

/**
 *
 * @param {import('../../utils/Bot')} client
 * @param {import('discord.js').Message} message
 */

async function createyomiage(client, message) {
  if (client.connection) {
    if (client.speekqueue.channel.includes(message.channelId)) {
      if (!fs.existsSync(`dat/voices/${message.guildId}`)) {
        fs.mkdirSync(`dat/voices/${message.guildId}`);
      }

      // txtを記録する
      let text = message
        .content
        .replace(/https?:\/\/\S+/g, 'URL省略')
        .replace(/<a?:.*?:\d+>/g, '絵文字省略')
        .replace(/<@!?.*?>/g, 'メンション省略')
        .replace(/<#.*?>/g, 'メンション省略')
        .replace(/<@&.*?>/g, 'メンション省略');

      for (const word of client.wordCache) {
        text = text.replace(new RegExp(word.index_word, 'gi'), word.read);
      }

      const audio_query = await rpc.post('audio_query?text=' + encodeURI(text) + '&speaker=8');
      const synthesis = await rpc.post('synthesis?speaker=1', JSON.stringify(audio_query.data), {
        responseType: 'arraybuffer',
        headers: {
          'accept': 'audio/wav',
          'Content-Type': 'application/json',
        },
      });

      if (!client.connection) return;
      fs.writeFileSync(`dat/voices/${message.guildId}/${message.id}.wav`, new Buffer.from(synthesis.data), 'binary');
      client.speekqueue.message.push(message.id);
      if (!client.speekqueue.flag) {
        yomiage(client, message);
      }
      client.speekqueue.flag = true;
    }
  }
}

/**
 * @param {import('../../utils/Bot')} client
 * @param {import('discord.js').Message} message
 */

function yomiage(client, message) {
  try {
    const player = createAudioPlayer();
    const messageid = client.speekqueue.message[0];
    client.speekqueue.message.shift();
    const resource = createAudioResource(`dat/voices/${message.guildId}/${message.id}.wav`);
    player.play(resource);
    client.connection.subscribe(player);
    player.on('error', error => {
      clienterrorlog(client, error);
      message.channel.send('読み上げ中にエラーが発生しました');
      fs.unlink(`dat/voices/${message.guildId}/${messageid}.wav`, function (err) {
        if (err) console.error(err);
      });
      if (client.speekqueue.message.length < 1) return client.speekqueue.flag = false;
    });

    player.on(AudioPlayerStatus.Idle, () => {
      fs.unlink(`dat/voices/${message.guildId}/${messageid}.wav`, function (err) {
        if (err) console.error(err);
      });
      if (client.speekqueue.message.length < 1) return client.speekqueue.flag = false;
      return yomiage(client, message);
    });
  }
  catch (error) {
    message.channel.send('読み上げ中にエラーが発生しました');
    console.error(error);
  }
}