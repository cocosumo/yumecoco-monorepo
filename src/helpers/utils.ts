/* eslint-disable @typescript-eslint/no-implied-eval */
export const generateRoot = () => {
  const root = document.createElement('div');
  root.id = 'app';
  document.body.appendChild(root);
  return document.getElementById('app');
};

export const isArray = (value : any) => Array.isArray(value);
export const isObject = (value : any) => !!(value && typeof value === 'object' && !isArray(value));
export const isField = (value: any) => isObject(value) && ('label' in value && 'value' in value);

export const isBrowser = new Function('try {return this===window;}catch(e){ return false;}');

export default {};
