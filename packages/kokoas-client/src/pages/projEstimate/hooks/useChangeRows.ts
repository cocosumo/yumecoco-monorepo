import { useFieldArray, useFormContext } from 'react-hook-form';
import { useCallback } from 'react';
import { calculateRowAmount, roundTo } from 'libs';
import { KItem, TForm } from '../schema';

export const useChangeRows = () => {
  const { getValues } = useFormContext<TForm>();
  const fieldArrayHelpers = useFieldArray<TForm>({
    name: 'items',
  });

  const {
    update,
  } = fieldArrayHelpers;
  
  const handleRowChange = useCallback((
    index: number, 
    fieldName: KItem,
    rows: TForm['items'],
  ) => {
    const taxRate = getValues('taxRate') / 100;
    const {
      costPrice,
      quantity,
      materialProfRate,
      unitPrice,
    }  = rows[index];

    const profitRate = materialProfRate / 100;
    
    let newRow = { ...rows[index] };
    

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

    update(index, newRow);

  }, [update, getValues]);

  return {
    handleRowChange,
    ...fieldArrayHelpers,
  };

};