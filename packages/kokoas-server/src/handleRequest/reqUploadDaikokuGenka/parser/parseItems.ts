import { ParsedDaikokuGenka } from 'types';
import xlsx from 'xlsx';

export const parseItems = (
  wb: xlsx.WorkBook,
) =>  {


  return Object
    .values(wb.Sheets)
    .reduce(
      (acc, sheet) => {

        /** Parse rows 9 ~ 43 */
        for (let i = 9; i <= 43; i++) {
          const majorItem: string = sheet[`F${i}`]?.v;
          const middleItem: string = sheet[`J${i}`]?.v;

          const material: string = sheet[`N${i}`]?.v;

          if (!majorItem || majorItem?.includes('小計')) {
            continue;
          }

          const currRow : ParsedDaikokuGenka['items'][number] = {
            majorItem,
            middleItem,
            material,
            unit: sheet[`R${i}`]?.v,
            costPrice: +sheet[`W${i}`]?.v,
            profitRate: +sheet[`Z${i}`]?.v,
            quantity: +sheet[`T${i}`]?.v,
            unitPrice: +sheet[`AB${i}`]?.v,
            rowUnitPrice: +sheet[`AE${i}`]?.v,
            rowCostPrice: +sheet[`AI${i}`]?.v,
            rowDetails: sheet[`AM${i}`]?.v ?? '',
          };

          acc.push(currRow);
        }

        return acc;
      },
      [] as ParsedDaikokuGenka['items'],
    );
};
