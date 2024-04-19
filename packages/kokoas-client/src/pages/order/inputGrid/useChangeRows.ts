import { useCallback } from 'react';
import { roundTo } from 'libs';
import { KItem } from '../schema';
import { FillEvent } from 'react-data-grid';
import { RowItem } from './useColumns';
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
          rowCostPriceBeforeTax: roundTo(newRowCostPrice),
        };
        
        break;
      }
      // TODO: add more cases if needed
    }

    return  newRow;
  }, []);


  const handleRowChange = useCallback((
    indexes: number[], 
    fieldName: KItem,
    rows: RowItem[],
  ) => {

    indexes.forEach((index) => {
      setValue(
        `items.${index}`, 
        calculatedRow(rows[index], fieldName),
        {
          shouldValidate: fieldName !== 'selected',
          shouldDirty: true,
          shouldTouch: fieldName !== 'selected',
        },
      );
    });

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