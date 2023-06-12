import { TableBody } from '@mui/material';
import { UseEstimateByProjIdReturn } from 'kokoas-client/src/hooksQuery';
import { IProjestimates } from 'types';
import { RowLayout } from './RowLayout';
import { roundTo } from 'libs';




export interface EstTableBodyProps {
  record: IProjestimates,
  results: NonNullable<UseEstimateByProjIdReturn['calculated'][number]['details']>
}

export const EstTableBody = ({
  record,
  results,
}: EstTableBodyProps) => {


  return (
    <TableBody>
      {record?.['内訳'].value.map(
        ({
          id,
          value: {
            大項目: majorItem,
            中項目: middleItem,
            部材名: materialName,
            部材備考: materialRemarks,

            単位: unit,
            備考: remarks,
          },
        },
        index) => {
          const {
            costPrice,
            quantity,
            unitPrice,
            rowUnitPriceAfterTax,
            profitRate,
            
          } = results[index];

          return (
            <RowLayout 
              key={id}
              majorItem={majorItem.value}
              middleItem={middleItem.value}
              material={materialName.value}
              materialRemarks={materialRemarks.value}
              costPrice={costPrice.toLocaleString()}
              quantity={quantity}
              unit={unit.value}
              profitRate={`${roundTo(profitRate * 100, 2)} %`}
              unitPrice={roundTo(unitPrice).toLocaleString()}
              amountAfterTax={roundTo(rowUnitPriceAfterTax).toLocaleString()}
              remarks={remarks.value}
              
            />
          );
        },
      )}
    </TableBody>
  );
};