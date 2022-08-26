import { fetchRecords } from './fetchRecords';

/*
  majourItems, middleItems, elements 取得するラッパー関数です。
  https://developer.mozilla.org/ja/docs/Glossary/Wrapper
*/

export const fetchMajorItems = () => fetchRecords('majourItems') as unknown as Promise<Estimates.majorItems.SavedData[]>;

export const fetchMiddleItems = async () => {
  return fetchRecords('middleItems') as unknown as Promise<Estimates.middleItems.SavedData[]>;
};

export const fetchMaterials = () => fetchRecords('elements') as unknown as Promise<Estimates.materials.SavedData[]>;

export const getMajorItems = fetchMajorItems()
  .then(res => res.map(({ 大項目名 }) => 大項目名.value ));

export const getMiddleItems = fetchMiddleItems()
  .then(res => res.map(({ 中項目名 }) => 中項目名.value ));