import { IProjestimates } from 'types';


const initialRow = {
  フォルダ１: '',
  フォルダ２: '',
  フォルダ３: '',
  フォルダ４: '',
  明細名: '',
  工事場所: '',
  工事種類: '',
  備考: '',
  取引先ID: '',
  取引先名: '',
  定価: 0,
  見積金額単価: 0,
  見積原価単価: 0,
  '本体/追加': '本体',
  数量: 0,
  単位: '',
  実行予算単価: 0,
  メモ: '',
};

interface EstimateToAndpadJsonSchema {
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
        明細名: 部材名.value,
        工事種類: 大項目.value,
        備考: 部材備考.value,
        見積金額単価: +単価.value,
        見積原価単価: +原価.value,
        数量: +数量.value,
        単位: 単位.value,
        実行予算単価: 0,
        メモ: 備考.value,
      };
    }), 
  };

  return estJson;
};

