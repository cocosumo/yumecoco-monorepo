import { IMaterialsitem, IMaterialsmajor, IMaterialsmid } from 'types';
import { fetchRecords } from './fetchRecords';

/*
  majourItems, middleItems, elements 取得するラッパー関数です。
  https://developer.mozilla.org/ja/docs/Glossary/Wrapper
*/

export const fetchMajorItems = () => fetchRecords('majourItems') as unknown as Promise<IMaterialsmajor[]>;
export const fetchMiddleItems = () => fetchRecords('middleItems') as unknown as Promise<IMaterialsmid[]>;
export const fetchMaterials = () => fetchRecords('elements') as unknown as Promise<IMaterialsitem[]>;

