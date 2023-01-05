import { Stack } from '@mui/material';
import { UseControllerProps, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../form';
import { CopyForm } from '../formActions/copy/CopyForm';
import { SelectExistEstimates } from './selectEstimates';

type FormProps<T extends TypeOfForm> = {
  controllerProps: UseControllerProps<T>;
};

export const ButtonMenu = <T extends TypeOfForm>({
  controllerProps,
}: FormProps<T>) => {
  const {
    name,
    control,
  } = controllerProps;

  const projId = useWatch({
    name,
    control: control,
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