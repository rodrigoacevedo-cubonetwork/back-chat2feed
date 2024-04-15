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
const idChannelC2F = 'C0A8XRTD3';
const slackBot = new SlackBot();

async function getHistoryMesagesOnChannel() {
  console.log('Starting search on chanell -> index.tsclear -> ', idChannelC2F);
  const result = await slackBot.getHistoryMessagesFromChannel(idChannelC2F!);
  //console.log(result);
}

getHistoryMesagesOnChannel();
