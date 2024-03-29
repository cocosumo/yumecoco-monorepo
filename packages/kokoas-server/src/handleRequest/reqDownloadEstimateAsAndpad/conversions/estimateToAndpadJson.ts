import { IProjestimates } from 'types';
import { initialRow } from './initialRow';

export interface EstimateToAndpadJsonSchema {
  estimateId: string;
  rows: Array<typeof initialRow>
}

export const estimateToAndpadJson = ({
  uuid,
  内訳: rows,
}: IProjestimates) => {

  const estJson: EstimateToAndpadJsonSchema = {
    estimateId: uuid.value,
    rows: rows.value.map(({ value: {
      部材名,
      大項目,
      中項目,
      部材備考,
      単価,
      原価,
      数量,
      単位,
      備考,
    } }) => {
      return {
        ...initialRow,
        フォルダ１: 大項目.value,
        フォルダ２: 中項目.value,
        明細名: 部材名.value,
        工事種類: 大項目.value,
        備考: 部材備考.value,
        見積金額単価: +単価.value,
        見積原価単価: +原価.value,
        数量: +数量.value,
        単位: 単位.value,
        実行予算単価: +原価.value,
        メモ: 備考.value,
      };
    }), 
  };

  return estJson;
};

