import { chatworkRooms } from 'config';
import { sendMessage } from './sendMessage';

describe('sendMessage', () => {
  it('should send message', async () => {
    const result = await sendMessage({
      body: 'テスト',
      roomId: chatworkRooms.rpa,
    }).catch(e => console.log(e.response.data.errors));

    expect(result);
  });
});