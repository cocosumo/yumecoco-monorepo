import { baseUrl } from 'config';
import { kintoneProxyWrapper } from 'libs';

export const checkServer = async () => {
  
  const startTime = performance.now();

  try {
    if (!baseUrl) {
      throw new Error('baseUrl is not defined');
    }
    
    const serverResponse = await kintoneProxyWrapper({
      url: baseUrl,
      method: 'GET',
      headers: {},
    });

    const endTime = performance.now();
    const runtime = endTime - startTime;

    return {
      runtime: runtime,
      alive: serverResponse.status === 200,
    };
  } catch (e) {
    console.error(e);
    const endTime = performance.now();

    const runtime = endTime - startTime;

    return {
      runtime: runtime,
      alive: false,
    };
  }
};