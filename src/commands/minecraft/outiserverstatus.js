const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    info: {
        name: 'outiserverstatus',
        description: 'おうちサーバーの状態を表示するコマンド',
        category: 'minecraft',
        deferReply: true,
    },

    data: new SlashCommandBuilder()
        .setName('outiserverstatus')
        .setDescription('おうちサーバーの状態を表示する'),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        await interaction.followUp('このコマンドは現在使用できません');

        /*
        statusBedrock('outiserver.com', 19132, { timeout: 5000 })
            .then(async (result) => {
                await interaction.followUp({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('🏠おうちサーバーの現在の状態🏠')
                            .addFields([
                                { name: 'IPアドレス', value: 'outiserver.com', inline: true },
                                { name: 'ポート', value: result.srvRecord?.port.toString() ?? '19132', inline: true },
                                { name: 'ーバーのバージョン', value: result.version.name, inline: true },
                                { name: 'IPアドレス', value: 'outiserver.com', inline: true },
                                { name: 'デフォルトゲームモード', value: result.gameMod, inline: true },
                                { name: '現在参加中のメンバー', value: `${result.players.online}/${result.players.max}人`, inline: true },
                            ])
                            .setImage('https://media.discordapp.net/attachments/818411667015991297/826376437769568286/outisabakoiyo.png')

                    ],
                });
            })
            .catch(async (e) => {
                console.log(e);
                await interaction.followUp({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('🏠おうちサーバーの現在の状態🏠')
                            .setDescription('おうちサーバーは現在落ちてます')
                            .setImage('https://media.discordapp.net/attachments/818411667015991297/818411777569325066/setumeisitekudasai.jpg')

                    ],
                });
            });
        */
    },
};