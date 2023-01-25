import { OutlinedInput, OutlinedInputProps } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../../form';

export const RowDetails = ({
  rowIdx,
}: OutlinedInputProps & {
  rowIdx: number  
}) => {

  const { register } = useFormContext<TypeOfForm>();

  return (
    <OutlinedInput
      {...register(getItemsFieldName(rowIdx, 'rowDetails'))}
      size={'small'}
      placeholder={'備考'}
    />
  );
};