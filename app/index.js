import { config } from 'dotenv';
import setupDB from './models';
import setupTelegramBot from './telegram';
import setupDiscordBot from './discord';

config();

// Config for codebattle postgresql database (production & development)
const pgDBConfig = {
  client: 'pg',
  useNullAsDefault: true,
  connection: {
    name: process.env.CODEBATTLE_DB_NAME,
    host: process.env.CODEBATTLE_DB_HOSTNAME,
    user: process.env.CODEBATTLE_DB_USERNAME,
    password: process.env.CODEBATTLE_DB_PASSWORD,
    port: process.env.CODEBATTLE_DB_PORT,
  },
};

setupDB(
  process.env.NODE_ENV === 'production'
    ? // if you want connect with local database from codebattle server
      // && process.env.NODE_ENV === 'development'
      pgDBConfig
    : undefined,
);

const telegramBot = setupTelegramBot({
  token: process.env.TELEGRAM_BOT_TOKEN || '',
  env: process.env.NODE_ENV,
});
const discordBot = setupDiscordBot({
  token: process.env.DISCORD_BOT_TOKEN || '',
  clientId: process.env.DISCORD_BOT_CLIENT_ID,
  env: process.env.NODE_ENV,
});

// Enable graceful stop
process.once('SIGINT', () => {
  if (telegramBot) {
    telegramBot.stop('SIGINT');
  }

  if (discordBot) {
    discordBot.destroy();
  }
});

process.once('SIGTERM', () => {
  if (telegramBot) {
    telegramBot.stop('SIGINT');
  }

  if (discordBot) {
    discordBot.destroy();
  }
});
