import { Client, GatewayIntentBits } from 'discord.js';
import { REST, Routes } from 'discord.js';

import logger from '../logger';
import socket from '../socket';

import commands from './commands';
import { intersection } from 'lodash';

// https://github.com/discordjs/discord.js/tree/main/packages/discord.js#readme

const noop = () => {};

const setupSlashCommands = async ({ token, clientId }) => {
  const rest = new REST({ version: '10' }).setToken(token);

  try {
    logger.info('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(clientId), {
      body: Object.values(commands),
    });

    logger.info('Successfully reloaded application (/) commands.');
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
  }
};

const setup = (params) => {
  const { token, env } = params;

  if (!token && env !== 'development') {
    throw new Error("Token for discord bot doesn't exists");
  }

  if (!token) {
    logger.error("Token for discord bot doesn't exists");
    return;
  }

  setupSlashCommands(params);

  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.on('ready', () => {
    logger.info(`Logged in as ${client.user.tag}!`);
  });

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const callback = commands[interaction.commandName]?.callback || noop;
    callback(intersection);
  });

  client.login(token);

  return client;
};

export default setup;
