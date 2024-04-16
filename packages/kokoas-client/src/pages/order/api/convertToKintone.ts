import { IOrderbudget } from 'types';
import { TForm } from '../schema';
import { initialRow } from '../form';

export const convertToKintone = ({
  items,
}: TForm) => {

  /*
    itemsの変換処理
    現在、最終行の原価はゼロだったら、保存しない仕様ですが、条件が変わることを想定して、reduceにしました。~ ras
  */
  const subtableItems = items.reduce<IOrderbudget['items']['value']>(
    (
      acc,
      {
        itemId,
        majorItem,
        middleItem,
        material,
        costPrice,
        quantity,
        rowCostPriceBeforeTax,
        taxRate,
        unit,
        rowRemarks,
      },
    ) => {

      // TODO: If "orderId" is present, skip conversion but retain the item id to avoid overwriting existing data.
      // The "orderId" is auto-generated upon order creation, so it should not be user-editable.
      // The necessity of this feature depends on how frequently the same record is edited simultaneously.

      const converted : Omit<IOrderbudget['items']['value'][number]['value'], 'orderId' | 'orderDataId' | 'supplierName' | 'status' > = {
        majorItem: { value: majorItem ?? '' },
        middleItem: { value: middleItem ?? '' },
        material: { value: material ?? '' },
        quantity: { value: quantity.toString() },
        unit: { value: unit ?? initialRow.unit },
        costPrice: { value: costPrice.toString() },
        orderAmountBeforeTax: { value: rowCostPriceBeforeTax.toString() },
        taxRate: { value: taxRate.toString() },
        rowRemarks: { value: rowRemarks ?? '' },
      };


      acc.push({
        id: itemId || '', // If not provided for existing item, it will be lost.

        // force type conversion as kintone generates type that make all fields required.
        value: converted as unknown as IOrderbudget['items']['value'][number]['value'], 
      }); 

      return acc;

    }, [],
  );

  const kintoneItems: IOrderbudget['items'] = {
    type: 'SUBTABLE',
    value: subtableItems,
  };

  /* 変換処理 */
  const kintoneRecord: Partial<IOrderbudget> = {
    items: kintoneItems as IOrderbudget['items'],
  };

  return kintoneRecord;
};