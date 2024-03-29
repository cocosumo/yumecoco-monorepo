import { Stack } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { CopyForm } from '../formActions/copy/CopyForm';
import { SelectExistEstimates } from './selectEstimates';
import { TForm } from '../schema';

export const ButtonMenu = () => {

  const { control } = useFormContext<TForm>();

  const projId = useWatch({
    name: 'projId',
    control,
  });

  return (

    <Stack direction={'row'} spacing={2}>
      {/* 見積もりの検索 */}
      {projId && <SelectExistEstimates projId={projId as TForm['projId']} />}

      {/* コピー */}
      <CopyForm />
    </Stack>

  );
};