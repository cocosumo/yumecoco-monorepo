import { kintoneProxyWrapper } from 'libs';

export const downloadFromUrl = async (url: string) => {

  const result = await kintoneProxyWrapper({
    url,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  console.log(result);
};