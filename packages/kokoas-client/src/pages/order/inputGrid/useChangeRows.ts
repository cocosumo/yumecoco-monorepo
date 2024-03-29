import { useCallback } from 'react';
import { calculateRowAmount, roundTo } from 'libs';
import { KItem } from '../schema';
import { FillEvent } from 'react-data-grid';
import { RowItem } from './useColumns';
import { produce } from 'immer';
import { useTypedFormContext } from '../hooks/useTypedRHF';





export const useChangeRows = () => {
  const { setValue } = useTypedFormContext();

  const calculatedRow = useCallback((row: RowItem, fieldName: KItem) => {

    const {
      costPrice,
      quantity,
      materialProfRate,
      unitPrice,

    } = row;

    const profitRate = materialProfRate / 100;
    let newRow = { ...row };


    switch (fieldName) {
      case 'quantity': {

        const {
          rowCostPrice: newRowCostPrice,
          unitPrice: newUnitPrice,
        } = calculateRowAmount({
          costPrice,
          quantity,
          taxRate: newRow.taxRate,
          profitRate,
        });


        newRow = {
          ...newRow,
          rowCostPriceBeforeTax: newRowCostPrice,
          unitPrice: newUnitPrice,
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
          taxRate: newRow.taxRate,
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
  }, []);


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