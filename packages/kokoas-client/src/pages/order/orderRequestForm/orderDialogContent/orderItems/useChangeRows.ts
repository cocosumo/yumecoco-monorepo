import { useCallback } from 'react';
import { roundTo } from 'libs';
import { RowItem } from './useColumns';
import { KItem } from '../../../schema';
import { useOrderFormContext } from '../../hooks/useOrderRHF';
import { useController } from 'react-hook-form';





export const useChangeRows = () => {
  const { setValue, control } = useOrderFormContext();
  const { 
    fieldState: {
      error,
    },
  } = useController({
    name: 'selectedItems',
    control,
  });

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
        `selectedItems.${index}`, calculatedRow(rows[index], fieldName),
        {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        },
      );
    });

  }, [ 
    setValue, 
    calculatedRow,  
  ]);


  return {
    handleRowChange,
    error,
  };

};