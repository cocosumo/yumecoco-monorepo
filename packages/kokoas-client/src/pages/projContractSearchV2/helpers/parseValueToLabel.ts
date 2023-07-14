import isValid from 'date-fns/isValid';
import format from 'date-fns/format';
import { translateKey } from './translateKey';
import { KForm, TForm } from '../schema';


const transformToLabel = <T = unknown>(value: T, suffix: 'から' | 'まで') => {

  if (isValid(value)) {
    return `契約日：${format(value as Date, 'yyyy-MM-dd')} ${suffix}`;
  }
};

export const parseValueToLabel = <T extends KForm>(
  name: T, value: TForm[T],
) => {

  if ( typeof value !== 'number' && !value) return;
  switch (name) {

    case 'amountFrom': return `契約金額：${(+value as number).toLocaleString()} 円以上`;
    case 'amountTo': return `契約金額：${(+value as number).toLocaleString()} 円以下`;

    case 'contractDateFrom': return transformToLabel(value, 'から');
    case 'contractDateTo': return transformToLabel(value, 'まで');

    case 'orderBy':
    case 'order': return; //テーブルヘッダーで分かるので、Chipとして表示しない

    case 'mainSearch': return `検索ワード：${value}`;

    case 'stores': return (value || []) as string[];

    case 'projTypes': return (value || []) as string[];
    

    default: return value ? translateKey(name) : undefined;
  }

};