import { config } from 'dotenv';
import { Socket } from 'phoenix';
import logger from '../logger';
import { WebSocket } from 'ws';

const connectionLogger = logger.child({ source: 'socket_connection' });

global.WebSocket = WebSocket;

config();

const socket = new Socket(process.env.BOT_CODEBATTLE_SOCKET_URL, {
  params: {
    user_token: process.env.BOT_CODEBATTLE_SOCKET_TOKEN,
  },
  logger: (kind, message, data) =>
    connectionLogger.info(
      `${kind}, ${JSON.stringify(message)}, ${JSON.stringify(data)}`,
    ),
});

socket.onOpen(() => {
  logger.info('Socket connection with codebattle server is open');
});
socket.onError((err) => {
  logger.error(
    `Socket connection with codebattle server is closed with error: ${JSON.stringify(
      err,
      null,
      2,
    )}`,
  );
});
socket.onMessage((message) => {
  logger.info(
    `Received message from codebattle server: ${JSON.stringify(
      message,
      null,
      2,
    )}`,
  );
});

socket.connect();

// socket.channel("chat_bot:telegram").join()
//   .receive("ok", () => {
//     logger.info("Connection with codebattle establish")
//   })
//   .receive("error", (err) => {
//     logger.error("Connection with codebattle doesn't establish")
//     logger.error(JSON.stringify(err, null, 2))
//   })

// Enable graceful stop
process.once('SIGINT', () => {
  if (socket) {
    socket.disconnect();
  }
});

process.once('SIGTERM', () => {
  if (socket) {
    socket.disconnect();
  }
});

export default socket;
