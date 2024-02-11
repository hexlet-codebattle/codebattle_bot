export const names = {
  ping: 'ping',
};

const commands = {
  [names.ping]: {
    name: names.ping,
    description: 'Replies with Pong!',
    callback: async (interaction) => {
      await interaction.reply('Pong!');
    },
  },
};

export default commands;
