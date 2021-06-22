const { Message, MessageEmbed } = require("discord.js");
const bot = require('../../bot');
const { errorlog } = require("../../functions/logs/error");
const verify = require('../../dat/json/verify.json');

module.exports = {
    info: {
        name: "verifylist",
        description: "全実績",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Level'
    },

    /**
     * @param {bot} client 
     * @param {Message} message 
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
            const embed = new MessageEmbed()
                .setTitle('おうち鯖にある全ての実績')
                .setColor('RANDOM')
                .setTimestamp();

            for (let i = 0; i < verify.length; i++) {
                embed.addField(verify[i].name, verify[i].description);
            }

            await message.channel.send(embed);
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}