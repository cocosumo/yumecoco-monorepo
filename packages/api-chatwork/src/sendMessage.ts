import axios from 'axios';

export const sendMessage = (
  {
    body,
    roomId,
    cwToken = process.env.CW_TOKEN,
  }:
  {
    body: string,
    roomId: string,
    cwToken?: string,
  },
) => {
  const selfUnread = 1;

  if (!cwToken) throw new Error(`Invalid chatwork token: ${cwToken}`);

  console.log(cwToken, roomId);

  const url = `https://api.chatwork.com/v2/rooms/${roomId}/messages`;
  const headers = {
    'X-ChatWorkToken': cwToken || '',
  };
  const params = `body=${body}&self_unread=${selfUnread}`;

  if (kintone) {
    return kintone.proxy(url, 'POST', headers, params);
  } else {
    return axios({
      url,
      headers,
      method: 'post',
      data: params,
    });
  }


};
