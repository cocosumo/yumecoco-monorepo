interface PostalAPIResponse {
  message: string,
  status: number,
  results: {
    address1: string,
    address2: string,
    address3: string,
  }[] | null
}

export const getAddressByPostal = async (postal: string) => {
  if (postal.length < 7) return '';

  return kintone.proxy(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postal}`, 'GET', {}, {})
    .then(([body]: any[]) => {
      const { status, results } : PostalAPIResponse = JSON.parse(body as string);
      console.log(status);
      if (status == 200 && results) {
        const { address1, address2, address3 } = results[0];
        return [address1, address2, address3].join('');
      }
    });
};