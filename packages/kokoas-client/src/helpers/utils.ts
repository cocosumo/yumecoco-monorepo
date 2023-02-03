import { format, parseISO } from 'date-fns';


/* eslint-disable @typescript-eslint/no-implied-eval */
export const generateRoot = () => {
  const root = document.createElement('div');
  root.id = 'app';
  document.body.appendChild(root);
};

export const isArray = (value : any) => Array.isArray(value);
export const isObject = (value : any) => !!(value && typeof value === 'object' && !isArray(value));
export const isField = (value: any) => isObject(value) && ('label' in value && 'value' in value);

export const isBrowser = new Function('try {return this===window;}catch(e){ return false;}');

export function daysInMonth(month: number, year : number) {
  return new Date(year, month, 0).getDate();
}

export const dateStrToJA = (dateStr: string, withTime = true) => {

  if (!dateStr) return '';
  if (withTime) {
    return format( parseISO(dateStr + '9:00'), 'yyyy年MM月dd日 HH:mm');
  } else {
    return format(new Date(dateStr), 'yyyy年MM月dd日');
  }

};

export const hiraToKana = (str: string) =>  {
  return str.replace(/[\u3041-\u3096]/g, (match: string) => {
    const charCode = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(charCode);
  });
};

export const getKanaRow = (str: string) => {
  const hira = str.normalize('NFD')[0]; // 濁点を削除

  if (/[あ-お]$/.test(hira)) return 'あ';
  if (/[か-こ]$/.test(hira)) return 'か';
  if (/[さ-そ]$/.test(hira)) return 'さ';
  if (/[た-と]$/.test(hira)) return 'た';
  if (/[な-の]$/.test(hira)) return 'な';
  if (/[は-ほ]$/.test(hira)) return 'は';
  if (/[ま-も]$/.test(hira)) return 'ま';
  if (/[や-よ]$/.test(hira)) return 'や';
  if (/[ら-ろ]$/.test(hira)) return 'ら';
  if (/[わ*]$/.test(hira)) return 'わ';


  return '?';

};



export default {};
