import { SlackBot } from './slackBolt';

interface IUserData {
  userId?: string;
  userName?: string;
  realName?: string;
  displayName?: string;
  imgUrl?: string;
  email?: string;
}

interface IMesageChannelData {
  channelId: string;
  text: string;
}

//const email = 'eberton.franca@zup.com.br';
const email = 'rodrigo.acevedo@cubo.network';

const slackBot = new SlackBot();

async function publishMesageOnChannel() {
  slackBot.publishMesageOnChannel({
    channelId: 'C05ML4SESMC',
    text: 'Hello World by TS :tada:',
  });
}

async function getDataUserSlackByEmail() {
  const userData = await slackBot.getSlackuUserDatabyEmail(
    'rodrigo.acevedo@cubo.network'
  );
  console.log('userData', userData);
}

async function publishDirectMessageToUserByEmail(email: string, text: string) {
  try {
    await slackBot.publishDirectMessageByEmail(email, text);
  } catch (error) {
    console.error(error);
  }
}

publishDirectMessageToUserByEmail(
  email,
  'Sending mesage using email serach by TS :tada:'
);
