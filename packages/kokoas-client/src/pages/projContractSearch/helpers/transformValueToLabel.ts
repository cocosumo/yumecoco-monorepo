import { KeyOfForm, TypeOfForm } from '../form';
import isValid from 'date-fns/isValid';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

const translate = (key: KeyOfForm) => {
  switch (key) {
    case 'contractCompleted': return '契約完了';
    case 'contractIncomplete': return '契約未完了';
    case 'contractStepTencho': return '店長確認中';
    case 'contractStepCustomer': return '顧客確認中';
    case 'contractStepAG': return 'AG確認中';
    case 'contractStepAccounting': return '会計確認中';
    case 'contractStepMain': return '本部確認中';
    default: return key;
  }
};

const transformToLabel = <T = unknown>(value: T, suffix: 'から' | 'まで') => {
  if (typeof value !== 'string') return;
  const dateObj = parseISO(value as string);
  if (isValid(dateObj)) {
    return `契約日：${format(dateObj, 'yyyy-MM-dd')} ${suffix}`;
  }
};

export const parseValue = <T extends KeyOfForm>(
  name: T, value: TypeOfForm[T],
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

    default: return value ? translate(name) : undefined;
  }

};