const { Message, MessageEmbed } = require('discord.js');
const util = require('minecraft-server-util');
const bot = require('../../bot');
const { errorlog, clienterrorlog } = require("../../functions/logs/error");

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
     * @param {bot} client
     * @param {Message} message
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
            if (message.channel.parentID !== '825170928237281311' && message.channel.parentID !== '844211706472169503' || message.channel.id === '833626570270572584') {
                const msg = await message.reply('このチャンネルでそのコマンドは使用できないで。😉');
                await msg.delete({ timeout: 5000 });
                return;
            }

            util.statusBedrock('126.235.33.140', { timeout: 5000 })
                    .then(async result => {
                        const msg = await message.channel.send(
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
                        );
                        await msg.delete({ timeout: 5000 });
                    })
                .catch(async error => {
                    clienterrorlog(error);
                    const msg = await message.channel.send(
                    new MessageEmbed()
                        .setTitle('🏠おうちサーバー(BE)の現在の状態🏠')
                        .setDescription('おうちサーバー(BE)は現在落ちてます')
                        .setImage('https://media.discordapp.net/attachments/840154191036022794/840154302605426698/setumeisitekudasai.png')
                        .setColor('RANDOM')
                        .setTimestamp()
                    );
                        await msg.delete({ timeout: 5000 });
                })
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    },
};