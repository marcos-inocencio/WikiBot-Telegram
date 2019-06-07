const env           = require('../.env');
const Telegraf      = require('telegraf');
const Telegram      = require('telegraf/telegram');
const bot           = new Telegraf(env.token);
const telegram      = new Telegram(env.token);

var  request = require('request');

bot.start((ctx, next) => {
    const name = ctx.update.message.from.first_name
    ctx.reply(`Olá ${name}, seja bem vindo ao WikiBot!`)
    next()
});

bot.start(ctx  => {
    ctx.reply(`Sobre o que gostaria de aprender hoje pequeno gafanhoto?`)
    
});

bot.on('text', async (ctx, next) => {
    await ctx.reply(`Otimo vamos lá!`)
    next()
});

bot.on('message', async (ctx) => {
    const chatId = ctx.message.text
    const pesq   = `https://pt.wikipedia.org/w/api.php?action=opensearch&search="+${chatId}+"&format=json`
    request(pesq, function (error, response, body) {
        if(!error && response.statusCode == 200){
            ctx.replyWithMarkdown('Procurando por ' + chatId + '...');
            ctx.reply(body, 'Result:\n' + body);
        }
        console.log(response);
    });
});


bot.startPolling();