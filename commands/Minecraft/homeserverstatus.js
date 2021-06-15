const { Client, Message, MessageEmbed } = require('discord.js');
const util = require('minecraft-server-util');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "homeserverstatus",
        description: "おうちサーバーの状態を表示するコマンド",
        usage: "",
        aliases: ["hss"],
        owneronly: false,
        adminonly: false,
        category: 'Minecraft'
    },

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */

    run: async function (client, message, args) {
        try {
            if (message.channel.parentID !== '825170928237281311' && message.channel.parentID !== '844211706472169503' || message.channel.id === '833626570270572584') {
                return message.reply('このチャンネルでそのコマンドは使用できないで。😉')
                    .then(msg => msg.delete({ timeout: 5000 }));
            }

            util.statusBedrock('126.235.33.140', { timeout: 5000 })
                .then((result) => message.channel.send(
                    new MessageEmbed()
                        .setTitle('🏠おうちサーバー(BE)の現在の状態🏠')
                        .addField('IPアドレス', result.host)
                        .addField('ポート', result.port)
                        .addField('サーバーのバージョン', result.version)
                        .addField('デフォルトゲームモード', result.gameMode)
                        .addField('現在参加中のメンバー', `${result.onlinePlayers}/${result.maxPlayers}人`)
                        .setImage('https://media.discordapp.net/attachments/840154191036022794/840154293453062144/outisabakoiyo.png')
                        .setColor('RANDOM')
                        .setTimestamp()
                ))
                .then(msg => msg.delete({ timeout: 5000 }))
                .catch(() => message.channel.send(
                    new MessageEmbed()
                        .setTitle('🏠おうちサーバー(BE)の現在の状態🏠')
                        .setDescription('おうちサーバー(BE)は現在落ちてます')
                        .setImage('https://media.discordapp.net/attachments/840154191036022794/840154302605426698/setumeisitekudasai.png')
                        .setColor('RANDOM')
                        .setTimestamp()

                )
                    .then(msg => msg.delete({ timeout: 5000 }))
                )
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    },
};