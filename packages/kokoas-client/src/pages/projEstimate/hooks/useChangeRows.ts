import { useFieldArray, useFormContext } from 'react-hook-form';
import { KRowFields, TypeOfForm } from '../form';
import { useCallback } from 'react';
import { calculateAmount, roundTo } from 'libs';
import { calculateEstimateRow } from 'api-kintone';

export const useChangeRows = () => {
  const { getValues } = useFormContext<TypeOfForm>();
  const fieldArrayHelpers = useFieldArray<TypeOfForm>({
    name: 'items',
  });

  const {
    update,
  } = fieldArrayHelpers;
  
  const handleRowChange = useCallback((
    index: number, 
    fieldName: KRowFields,
    rows: TypeOfForm['items'],
  ) => {
    const taxRate = getValues('taxRate') / 100;
    const {
      costPrice,
      quantity,
      materialProfRate,
      unitPrice,
      rowCostPrice,
      rowUnitPriceBeforeTax,
      taxable: isTaxable,
    }  = rows[index];

    const profitRate = materialProfRate / 100;
    
    let newRow = { ...rows[index] };

    switch (fieldName) {
      case 'quantity':
      case 'costPrice': {
        console.log()
        const {
          rowCostPrice: newRowCostPrice,
          unitPrice: newUnitPrice,
          rowUnitPriceBeforeTax: newUnitPriceBeforeTax,
          rowUnitPriceAfterTax: newUnitPriceAfterTax,
        } = calculateEstimateRow({
          costPrice,
          quantity,
          taxRate,
          profitRate,
          isTaxable,
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
          amountAfterTax,
          costPrice: newRowCostPrice,
        } = calculateAmount({
          amountBeforeTax: rowUnitPriceBeforeTax,
          costPrice: rowCostPrice,
          taxRate: taxRate,
          profitRate: materialProfRate / 100,
        });

        newRow = {
          ...newRow,
          rowUnitPriceAfterTax: amountAfterTax,
          costPrice:  newRowCostPrice / quantity,
        };

        console.log('newRow', materialProfRate,  unitPrice, unitPrice * quantity, newRow);
        break;
      }
      case 'materialProfRate':
        //handleChangeProfitRate(index, value as number);
        break;

    }

    update(index, newRow);

  }, [update, getValues]);

  return {
    handleRowChange,
    ...fieldArrayHelpers,
  };

};