import { fetchRecords } from './fetchRecords';

/*
  majourItems, middleItems, elements 取得するラッパー関数です。
  https://developer.mozilla.org/ja/docs/Glossary/Wrapper
*/

export const fetchMajorItems = () => fetchRecords('majourItems') as unknown as Promise<Estimates.majorItems.SavedData[]>;
export const fetchMiddleItems = () => fetchRecords('middleItems') as unknown as Promise<Estimates.middleItems.SavedData[]>;
export const fetchMaterials = () => fetchRecords('elements') as unknown as Promise<Estimates.materials.SavedData[]>;

