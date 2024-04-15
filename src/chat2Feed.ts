import { App } from '@slack/bolt';
import { LogLevel, WebClient } from '@slack/web-api';
import * as dotenv from 'dotenv';

dotenv.config();

//Slack confs
const xTokenC2F = process.env.SLACK_BOT_TOKEN_C2F;
const idChannelC2F = process.env.SLACK_CHANNEL_ID_C2F;

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(xTokenC2F, {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG,
});

// Store conversation history
let conversationHistory;
// ID of channel you watch to fetch the history for
let channelId = idChannelC2F!;

try {
  // Call the conversations.history method using WebClient
  const result = await client.conversations.history({
    channel: channelId,
  });

  console.log(result.length + ' messages found in ' + channelId);
} catch (error) {
  console.error(error);
}
