const { Client, MessageEmbed, Collection } = require('discord.js');
const util = require('minecraft-server-util');
const { Database } = require('../../home/index');
const { clienterrorlog } = require('../../functions/error');
let count = 0;

/**
 * @param {Client} client
 */

module.exports = (client) => {
    try {
        const db = new Database('unkoserver.db');
        client.channels.cache.get('780012050163302420').messages.fetch('832504476262465586')
            .then(msg => {
                util.statusBedrock('126.235.33.140', { timeout: 1000 })
                    .then((result) => {
                        count++;
                        if (count >= 10) {
                            const time = new Date();
                            const serversettingdata = db.ServerSettingGet('706452606918066237');
                            serversettingdata.serverjoindedcase++;
                            db.Serverjoindedset({ id: serversettingdata.serverjoindedcase, serverjoindedcase: serversettingdata.serverjoindedcase, time: `${time.getMonth()}月${time.getDate()}日${time.getHours()}時${time.getMinutes()}分`, joinded: result.onlinePlayers });
                            db.ServerSettingSet(serversettingdata);
                            count = 0;
                        }
                        msg.edit(
                            new MessageEmbed()
                                .setTitle('🏠おうちサーバー(BE)の現在の状態🏠')
                                .addField('IPアドレス', result.host)
                                .addField('ポート', result.port)
                                .addField('サーバーのバージョン', result.version)
                                .addField('デフォルトゲームモード', result.gameMode)
                                .addField('現在参加中のメンバー', `${result.onlinePlayers}/${result.maxPlayers}人`)
                                .setImage('https://media.discordapp.net/attachments/818411667015991297/826376437769568286/outisabakoiyo.png')
                                .setColor('RANDOM')
                                .setTimestamp()
                        );
                    })
                    .catch((error) => {
                        msg.edit(
                            new MessageEmbed()
                                .setTitle('🏠おうちサーバー(BE)の現在の状態🏠')
                                .setDescription('おうちサーバー(BE)は現在落ちてます')
                                .setImage('https://media.discordapp.net/attachments/818411667015991297/818411777569325066/setumeisitekudasai.jpg')
                                .setColor('RANDOM')
                                .setTimestamp()
                        );
                    });
            });

        client.levelcooldown = new Collection();
    } catch (error) {
        clienterrorlog(client, error);
    }
};