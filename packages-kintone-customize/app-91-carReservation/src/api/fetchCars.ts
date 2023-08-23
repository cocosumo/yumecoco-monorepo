import { getRecords } from 'api-kintone';

const carsAppId = 38;


export const fetchCars = async ()  => {

  return getRecords<kintone.types.SavedCarAppFields>({
    app: carsAppId,
  });
};