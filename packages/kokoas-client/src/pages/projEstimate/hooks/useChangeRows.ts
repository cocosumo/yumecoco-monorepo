import { useFieldArray } from 'react-hook-form';
import { Item, KRowFields, TypeOfForm } from '../form';
import { useCallback } from 'react';

export const useChangeRows = () => {

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
    const newRow = { ...rows[index] };
    //const fieldKey = getItemsFieldName(index, fieldName);
    update(index, newRow);

    switch (fieldName) {
      case 'costPrice':
        console.log('updated CostPrice!');
        //handleChangeCostPrice(index, value as number);
        break;
      case 'quantity':
        // handleChangeQuantity(index, value as number);
        break;
      case 'unitPrice':
        //handleChangeUnitPrice(index, value as number);
        break;
      case 'materialProfRate':
        //handleChangeProfitRate(index, value as number);
        break;

    }


  }, [update]);

  return {
    handleRowChange,
    ...fieldArrayHelpers,
  };

};