import { kintoneProxyWrapper } from 'libs';
import qs from 'qs';

/**
 * 
 * @param param0 
 * @see https://developer.chatwork.com/docs/endpoints
 */
export const sendMessage = (
  {
    body,
    roomId,
    cwToken = process.env.CW_TOKEN_REPORTER,
  }:
  {
    body: string,
    roomId: string,
    cwToken?: string,
  },
) => {
  const selfUnread = 1;

  if (!cwToken) throw new Error(`Invalid chatwork token: ${cwToken}`);

  const url = `https://api.chatwork.com/v2/rooms/${roomId}/messages`;
  const headers = {
    'X-ChatWorkToken': cwToken || '',


  };
  const params = qs.stringify({
    body,
    self_unread: selfUnread,
  });

  return kintoneProxyWrapper({
    url:  `${url}?${params}`,
    headers,
    method: 'POST',
    data: {},
  });

};
