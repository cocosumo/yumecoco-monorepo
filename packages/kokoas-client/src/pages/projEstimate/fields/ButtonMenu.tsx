import { Stack } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../form';
import { CopyForm } from '../formActions/copy/CopyForm';
import { SelectExistEstimates } from './selectEstimates';

export const ButtonMenu = () => {

  const { control } = useFormContext<TypeOfForm>();

  const projId = useWatch({
    name: 'projId',
    control,
  });

  return (

    <Stack direction={'row'} spacing={2}>
      {/* 見積もりの検索 */}
      {projId && <SelectExistEstimates projId={projId as TypeOfForm['projId']} />}

      {/* コピー */}
      <CopyForm />
    </Stack>

  );
};