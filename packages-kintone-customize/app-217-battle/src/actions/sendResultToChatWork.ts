import { sendMessage } from 'api-chatwork';
import { chatworkRooms } from 'config';
import { KintoneEvent } from '../eventHandlers/onEditOrCreateSubmitSuccessHandler';
import generateMessage from './generateMessage';

const sendResultToChatWork = (event: KintoneEvent) => {
  const message = generateMessage(event);
  sendMessage({
    body: message,
    roomId: chatworkRooms.test,
  });
};

export default sendResultToChatWork;
