import { URLParams } from 'types';

export const generateParams = (obj: URLParams) => {
  // Remove undefined
  Object.keys(obj).forEach((key: keyof typeof obj) => (obj[key] === undefined || obj[key] === '' ) && delete obj[key]);
  return new URLSearchParams(obj as Record<string, string>).toString();
};