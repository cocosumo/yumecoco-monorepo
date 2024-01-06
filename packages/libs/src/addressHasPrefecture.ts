import { getPrefectures } from './getPrefectures';

export const addressHasPrefecture = (address: string) => {
  if (!address.includes('県')) return false;

  const prefectures = getPrefectures();
  
  const prefectureFromAdress = address.slice(0, address.indexOf('県') + 1); 

  return prefectures.includes(prefectureFromAdress);
};