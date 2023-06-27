import { kintoneProxyWrapper } from 'libs';
import qs from 'qs';


export const getAddressDetails = async (address: string) => {
  
  const queryParams = qs.stringify({
    key: process.env.GOOGLE_MAPS_KEY,
    address: address,
  });

  const url = `https://maps.googleapis.com/maps/api/geocode/json?${queryParams}`;

  const result = await kintoneProxyWrapper<{
    results: google.maps.GeocoderResult[]
    status: string
  }>({
    method: 'GET',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return result;
};