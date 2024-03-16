import { useFormContext } from 'react-hook-form';
import { useCallback } from 'react';
import { calculateRowAmount, roundTo } from 'libs';
import { KItem, TForm } from '../schema';
import { FillEvent } from 'react-data-grid';
import { RowItem } from './useColumns';
import { produce } from 'immer';





export const useChangeRows = () => {
  const { getValues, setValue } = useFormContext<TForm>();

  const calculatedRow = useCallback((row: RowItem, fieldName: KItem) => {
    const taxRate = getValues('taxRate') / 100;

    const {
      costPrice,
      quantity,
      materialProfRate,
      unitPrice,

    } = row;

    const profitRate = materialProfRate / 100;
    let newRow = { ...row };


    switch (fieldName) {
      case 'quantity':
      case 'materialProfRate':
      case 'costPrice': {

        const {
          rowCostPrice: newRowCostPrice,
          unitPrice: newUnitPrice,
          rowUnitPriceBeforeTax: newUnitPriceBeforeTax,
          rowUnitPriceAfterTax: newUnitPriceAfterTax,
          
        } = calculateRowAmount({
          costPrice,
          quantity,
          taxRate,
          profitRate,
        });


        newRow = {
          ...newRow,
          rowCostPrice: newRowCostPrice,
          unitPrice: newUnitPrice,
          rowUnitPriceBeforeTax: newUnitPriceBeforeTax,
          rowUnitPriceAfterTax: newUnitPriceAfterTax,
        };
        
        break;
      }
      case 'unitPrice':{
        const {
          rowUnitPriceBeforeTax: newUnitPriceBeforeTax,
          rowUnitPriceAfterTax: newUnitPriceAfterTax,
          profitRate: newProfitRate,
        } = calculateRowAmount({
          unitPrice,
          costPrice,
          quantity,
          taxRate,
        });


        newRow = {
          ...newRow,
          rowUnitPriceBeforeTax: newUnitPriceBeforeTax,
          rowUnitPriceAfterTax: newUnitPriceAfterTax,
          materialProfRate: roundTo(newProfitRate * 100, 2),
        };

        break;
      }


    }

    return  newRow;
  }, [ getValues ]);


  const handleRowChange = useCallback((
    indexes: number[], 
    fieldName: KItem,
    rows: RowItem[],
  ) => {
    //update(index, newRow);

    setValue(
      'items', 
      produce(rows, draft => {
        indexes.forEach((index) => {
          draft[index] = calculatedRow(draft[index], fieldName);
        });
      }),
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      },
    );

  }, [ 
    setValue, 
    calculatedRow,  
  ]);

  function handleFill({ columnKey, sourceRow, targetRow }: FillEvent<RowItem>): RowItem {
    return { ...targetRow, [columnKey]: sourceRow[columnKey as keyof RowItem] };
  }

  return {
    handleRowChange,
    handleFill,
  };

};