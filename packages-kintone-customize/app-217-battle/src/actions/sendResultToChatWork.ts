import { sendMessage } from 'api-chatwork';
import { chatworkRooms, isProd } from 'config';
import { KintoneEvent } from '../types';
import { generateMessage } from './generateMessage';

export const sendResultToChatWork = (event: KintoneEvent) => {
  const message = generateMessage(event);
  sendMessage({
    body: message,
    roomId: chatworkRooms[isProd ? 'yumetetsuReport' : 'test' ],
  });
};

