import axios from 'axios';

interface PostalAPIResponse {
  message: string,
  status: number,
  results: {
    address1: string,
    address2: string,
    address3: string,
  }[] | null
}

/**
 * 郵便番号で取得します。
 *
 */
export const getAddressByPostal = async (
  postal: string,
) : Promise<{
  prefecture: string,
  city: string,
  town: string,
} | undefined> => {
  if (postal.length < 7) return;
  const endpoint = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postal}`;
  try {
    return await kintone.proxy(endpoint, 'GET', {}, {})
      .then(([body]: unknown[]) => {
        const { status, results } : PostalAPIResponse = JSON.parse(body as string);

        if (status == 200 && results) {
          const { address1, address2, address3 } = results[0];
          return {
            prefecture: address1,
            city: address2,
            town: address3,
          };
        }
      });
  } catch (e) {
    if (e instanceof ReferenceError) {
      // Kintone上でない時, 利用した場合
      const { results }: PostalAPIResponse = (await axios.get(endpoint)).data;
      if (results) {
        const { address1, address2, address3 } = results[0];
        return {
          prefecture: address1,
          city: address2,
          town: address3,
        };
      }

    } else {
      throw new Error(e);
    }

  }

};