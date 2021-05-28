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
            const webhook = new WebhookClient('847786776420286467', 'YgM-ObvRhgw_q0aKQuzJVnTDCE0jzTaiP4Qb8VgonBJVa2BLj_bt9FuvVsFKjr63nUkv');
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
            const webhook = new WebhookClient('847786776420286467', 'YgM-ObvRhgw_q0aKQuzJVnTDCE0jzTaiP4Qb8VgonBJVa2BLj_bt9FuvVsFKjr63nUkv');
            webhook.send(error.stack, { code: true, split: true });
        }
        catch (error) { }
    }
}