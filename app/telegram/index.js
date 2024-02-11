import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import logger from '../logger';
import socket from '../socket';

// https://github.com/telegraf/telegraf

const setup = (params) => {
  const { token, env } = params;

  if (!token && env !== 'development') {
    throw new Error("Token for Telegram bot doesn't exists");
  }

  if (!token) {
    logger.error("Token for telegram bot doesn't exists");
    return;
  }

  const bot = new Telegraf(token);

  bot.start((ctx) => {
    logger.info('Welcome');
    ctx.reply('Welcome');
  });
  bot.help((ctx) => ctx.reply('Send me a sticker'));
  bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
  bot.hears('hi', (ctx) => ctx.reply('Hey there'));
  bot.launch();

  return bot;
};

export default setup;
