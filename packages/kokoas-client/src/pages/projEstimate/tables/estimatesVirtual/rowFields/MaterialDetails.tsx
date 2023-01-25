import { OutlinedInput, OutlinedInputProps } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../../form';

export const MaterialDetails = ({
  rowIdx,
}: OutlinedInputProps & {
  rowIdx: number  
}) => {

  const { register } = useFormContext<TypeOfForm>();

  return (
    <OutlinedInput
      {...register(getItemsFieldName(rowIdx, 'materialDetails'))}
      size={'small'}
      placeholder={'品質・色'}
    />
  );
};