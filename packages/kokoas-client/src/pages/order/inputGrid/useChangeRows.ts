import { useCallback } from 'react';
import { roundTo } from 'libs';
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

    } = row;

    let newRow = { ...row };


    switch (fieldName) {
      case 'quantity': 
      case 'costPrice': {

        const newRowCostPrice = roundTo(costPrice * quantity);

        newRow = {
          ...newRow,
          rowCostPriceBeforeTax: newRowCostPrice,
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