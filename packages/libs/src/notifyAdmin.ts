import { sendMessage } from 'api-chatwork';
import { chatworkRooms } from 'config';

/** Adminに通知 */
export const notifyAdmin = async (message: string) => {

  try {
    await sendMessage({
      body: message,
      roomId: chatworkRooms.test,
    });

  } catch (err) {
    console.error(`Chatwork送信にエラーが発生しました。${err.message}`);
  }
};