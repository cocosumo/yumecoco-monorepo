interface PostalAPIResponse {
  message: string,
  status: number,
  results: {
    address1: string,
    address2: string,
    address3: string,
  }[] | null
}

export const getAddressByPostal = async (
  postal: string,
) : Promise<{
  prefecture: string,
  city: string,
  town: string,
} | undefined> => {
  if (postal.length < 7) return;

  return kintone.proxy(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postal}`, 'GET', {}, {})
    .then(([body]: any[]) => {
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
};