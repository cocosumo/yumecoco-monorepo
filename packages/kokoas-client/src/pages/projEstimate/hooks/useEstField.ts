import { OutlinedInputProps } from '@mui/material';
import { useFormContext, UseFormReturn, useFormState } from 'react-hook-form';
import { getItemsFieldName, KRowFields, TypeOfForm } from '../form';


/* 
  Abstraction of common props used in 見積 fields.
  This trigger re-render, and might need to ditch MUI and purely resort to native html and css if this cause bottlenecks.
*/
export const useEstField = ({
  rowIdx,
  fieldName,
}:{
  rowIdx: number,
  fieldName: KRowFields
}): OutlinedInputProps & {
  formContext : UseFormReturn<TypeOfForm>,
  fieldName: 'items.0.costPrice'
} => {

  const rowFieldName = getItemsFieldName(rowIdx, fieldName);
  const formContext = useFormContext<TypeOfForm>();
  const { control } = formContext;
  const {
    errors: {
      items,
    },
  } = useFormState({
    name: rowFieldName,
    control,
  });

  const error = !!items?.[rowIdx]?.[fieldName];
  
  return {
    fieldName: rowFieldName,
    formContext,
    error: !!error,
    onFocus: ({ target }) => target.select(),
  };
};