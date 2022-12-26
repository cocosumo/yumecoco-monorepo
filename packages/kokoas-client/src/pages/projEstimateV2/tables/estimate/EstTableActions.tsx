import { Button, Stack } from '@mui/material';
//import { useFormikContext } from 'formik';
//import { produce } from 'immer';
//import { initialValues, TypeOfForm } from '../form';
//import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
import { HotKeyTooltip } from 'kokoas-client/src/components';
import { UseFieldArrayAppend, useFormContext } from 'react-hook-form';
import { initialRow, TypeOfForm } from '../../form';

export const EstTableActions = ({
  append,
}: {
  append: UseFieldArrayAppend<TypeOfForm, 'items'>
}) => {
  const { getValues } = useFormContext<TypeOfForm>();

  return (
    <Stack direction="row" justifyContent={'flex-end'}>
      <HotKeyTooltip title='insert'>
        <Button
          variant="contained"
          color="success"
          //disabled={!!envStatus}
          startIcon={<AddIcon />}
          onClick={() => {
            append({
              ...initialRow,
              elemProfRate: getValues('projTypeProfit'),
            });
          }}
        >
          行追加
        </Button>
      </HotKeyTooltip>
    </Stack>
  );
};