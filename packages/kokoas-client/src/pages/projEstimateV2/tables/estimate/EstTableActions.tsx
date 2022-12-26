import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { HotKeyTooltip } from 'kokoas-client/src/components';
import { UseFieldArrayReturn, useWatch } from 'react-hook-form';
import { estArrayFieldName, TypeOfForm } from '../../form';
import { useCallback, useEffect } from 'react';
import { useRowValues } from '../../hooks/useRowValues';
import isEqual from 'lodash/isEqual';



export const EstTableActions = ({
  append,
  fields,
}: UseFieldArrayReturn<TypeOfForm>) => {

  const {
    getNewRow,
  } = useRowValues();

  const handleAppend = useCallback(() => {
    append(getNewRow());
  }, [append, getNewRow]);

  const lastRowName = `${estArrayFieldName}.${fields.length - 1}`;

  const lastRow = useWatch({
    name: lastRowName as 'items.0.test',
  });

  useEffect(() => {

    const equal = isEqual(lastRow, getNewRow());
    if (!equal) {
      handleAppend();
    }
  }, [lastRow, getNewRow, handleAppend]);

  return (
    <Stack direction="row" justifyContent={'flex-end'}>
      <HotKeyTooltip title='insert'>
        <Button
          variant="contained"
          color="success"
          //disabled={!!envStatus}
          startIcon={<AddIcon />}
          onClick={handleAppend}
        >
          行追加
        </Button>
      </HotKeyTooltip>
    </Stack>
  );
};