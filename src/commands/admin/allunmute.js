const { SlashCommandBuilder } = require('@discordjs/builders');
const { errorlog, commanderror_message } = require('../../functions/error');

module.exports = {
    info: {
        name: 'allunmute',
        description: '全員のミュートを解除する',
        usage: '',
        aliases: [],
        category: 'main',
    },

    data: new SlashCommandBuilder()
        .setName('allunmute')
        .setDescription('全員のミュートを解除する'),

    /**
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            interaction.followUp('未対応');
        }
        catch (error) {
            errorlog(client, interaction, error);
        }
    },

    /**
     *
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').Message} message
     * @param {Array<string>} args
     */
    // eslint-disable-next-line no-unused-vars
    run_message: async function (client, message, args) {
        try {
            if (!message.member.voice.channel) return await message.reply('このコマンドを使用するにはVCに参加している必要があります');
            message.member.voice.channel.members.filter(m => !m.user.bot).map(async m => {
                try {
                    await m.voice?.setMute(false, `UnMutedBy: ${message.author.tag}`);
                }
                // eslint-disable-next-line no-empty
                catch (error) {
                }
            });

            await message.reply('VCにいるメンバー全員をミュート解除しました');
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};