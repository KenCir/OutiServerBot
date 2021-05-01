const { Client, MessageEmbed, MessageAttachment, Collection } = require('discord.js');
const util = require('minecraft-server-util');
const { clienterrorlog } = require('../../functions/error');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    try {
        client.channels.cache.get('780012050163302420').messages.fetch('832504476262465586')
            .then(msg => {
                util.statusBedrock('126.235.33.140', { timeout: 1000 })
                    .then((result) => {
                        message.channel.send(
                            new MessageEmbed()
                                .attachFiles([new MessageAttachment('dat/images/outisabakoiyo.png', 'outisabakoiyo.png')])
                                .setTitle('🏠おうちサーバー(BE)の現在の状態🏠')
                                .addField('IPアドレス', result.host)
                                .addField('ポート', result.port)
                                .addField('サーバーのバージョン', result.version)
                                .addField('デフォルトゲームモード', result.gameMode)
                                .addField('現在参加中のメンバー', `${result.onlinePlayers}/${result.maxPlayers}人`)
                                .setImage('attachment://outisabakoiyo.png')
                                .setColor('RANDOM')
                                .setTimestamp()
                        );
                    })
                    .catch(() => {
                        message.channel.send(
                            new MessageEmbed()
                                .attachFiles([new MessageAttachment('dat/images/setumeisitekudasai.png', 'setumeisitekudasai.png')])
                                .setTitle('🏠おうちサーバー(BE)の現在の状態🏠')
                                .setDescription('おうちサーバー(BE)は現在落ちてます')
                                .setImage('attachment://setumeisitekudasai.png')
                                .setColor('RANDOM')
                                .setTimestamp()
                        );
                    });
            });

        util.statusBedrock('126.235.33.140', { port: 19131, timeout: 1000 })
            .then(result => client.channels.cache.get('834317763769925632').setTopic(`現在のサーバー参加人数: ${result.onlinePlayers}/${result.maxPlayers}人`))
            .catch();

        client.levelcooldown = new Collection();
    } catch (error) {
        clienterrorlog(client, error);
    }
};