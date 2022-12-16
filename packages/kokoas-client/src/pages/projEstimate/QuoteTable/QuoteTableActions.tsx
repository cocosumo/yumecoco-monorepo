import { Button, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { initialValues, TypeOfForm } from '../form';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';

export const QuoteTableActions = () => {
  const { setValues } = useFormikContext<TypeOfForm>();

  return (
    <Stack direction="row" justifyContent={'flex-end'}>
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        onClick={() => {
          setValues(
            prev => produce(prev, draft => {
              draft.items.push({
                ...initialValues.items[0],
                key: uuidv4(),
                elemProfRate: draft.projTypeProfit,
              });
            }),
            false,
          );
        }}
      >
        行追加
      </Button>
    </Stack>
  );
};