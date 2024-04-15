import { App } from '@slack/bolt';
import * as dotenv from 'dotenv';

dotenv.config();

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

export class SlackBot {
  app = new App({
    // token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN_C2F,
  });

  public async getHistoryMessagesFromChannel(channelId: string): Promise<void> {
    let conversationHistory = [];

    console.log('channelId received -> ', channelId);
    try {
      const result = await this.app.client.conversations.history({
        token: process.env.SLACK_BOT_TOKEN_C2F,
        channel: channelId,
        limit: 10,
      });

      conversationHistory = result.messages!;

      console.log(
        conversationHistory?.length + ' messages found in ' + channelId
      );
      console.log(conversationHistory);
    } catch (error) {
      console.error(error);
    }
  }

  public async publishMesageOnChannel({
    channelId,
    text,
  }: IMesageChannelData): Promise<void> {
    try {
      const result = await this.app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: channelId,
        text: text,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  public async getSlackuUserDatabyEmail(email: string): Promise<any> {
    try {
      let user: IUserData = {};

      let dataRecovered = await this.app.client.users.lookupByEmail({
        token: process.env.SLACK_BOT_TOKEN,
        email: email,
      });

      user.userId = dataRecovered.user?.id;
      user.userName = dataRecovered.user?.name;
      user.realName = dataRecovered.user?.real_name;
      user.displayName = dataRecovered.user?.profile?.display_name;
      user.imgUrl = dataRecovered.user?.profile?.image_512;
      user.email = dataRecovered.user?.profile?.email;

      return user;
    } catch (error) {}
  }

  public async publishDirectMessageByEmail(
    userEmail: string,
    text: string
  ): Promise<void> {
    try {
      let user: IUserData = {};
      console.log('userEmail', userEmail);
      const userData = await this.getSlackuUserDatabyEmail(userEmail);

      console.log('userData', userData);

      user.userId = userData.userId;
      user.userName = userData.userName;
      user.displayName = userData.displayName;
      user.imgUrl = userData.imgUrl;
      user.email = userData.email;

      console.log('user', user);

      const blocks = [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: ':fire: Teste de envio de mensagem via *Integração Node*',
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*E-mail do Usuário*\n:star::star: ${userEmail}:star::star:`,
          },
          accessory: {
            type: 'image',
            image_url:
              //'https://avatars.slack-edge.com/2021-09-14/2514616868240_03ac5adbc08b9c167418_512.jpg',
              '' + user.imgUrl + '',
            alt_text: 'alt text for image',
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text:
              '*Nome do Usuário*\n:star::star: ' +
              user.displayName +
              ' :star::star:',
          },
          accessory: {
            type: 'image',
            image_url: `${user.imgUrl}`,
            alt_text: `${user.displayName}`,
          },
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'OK',
                emoji: true,
              },
              value: 'OK',
            },
          ],
        },
      ];

      console.log('blocks', blocks);

      // Call the chat.postMessage method using the built-in WebClient
      const result = await this.app.client.chat.postMessage({
        // The token you used to initialize your app
        token: process.env.SLACK_BOT_TOKEN,
        channel: user.userId as string,
        text: text,
        blocks,

        // You could also use a blocks[] array to send richer content
      });

      // Print result, which includes information about the message (like TS)
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}
