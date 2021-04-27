const { Client, Message, WebhookClient } = require("discord.js");

module.exports = {

    /**
     * @param {Client} client
     * @param {Message} message 
     * @param {*} error
     */

    errorlog: async function (client, message, error) {
        console.error(error);
        try {
            const webhook = new WebhookClient('835806322938216468', 'KkEyBU0QDVaiiYNea_gCWrv4-ulyT-vnuKAT9tu7vWleO-JqFa6fCDV5H2BDvY8jQBPf');
            webhook.send(error.stack, { code: true, split: true });
            message.channel.send('コマンド実行中にエラーが発生したみたいや、もう一度実行してな。😉');
        }
        catch (error) { }
    },

    /**
     * @param {Client} client
     * @param {string} channelid
     * @param {*} error
     */

    clienterrorlog: async function (client, error) {
        console.error(error);
        try {
            const webhook = new WebhookClient('835806322938216468', 'KkEyBU0QDVaiiYNea_gCWrv4-ulyT-vnuKAT9tu7vWleO-JqFa6fCDV5H2BDvY8jQBPf');
            webhook.send(error.stack, { code: true, split: true });
        }
        catch (error) { }
    }
}