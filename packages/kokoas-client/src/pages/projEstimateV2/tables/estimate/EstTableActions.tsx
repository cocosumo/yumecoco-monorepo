import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { HotKeyTooltip } from 'kokoas-client/src/components';
import { useWatch } from 'react-hook-form';
import { estArrayFieldName } from '../../form';
import { useEffect } from 'react';
import { useRowValues } from '../../hooks/useRowValues';
import isEqual from 'lodash/isEqual';
import { UseManipulateItemRows } from '../../hooks/useManipulateItemRows';



export const EstTableActions = ({
  rowsCount,
  handleAppendItem,
}: UseManipulateItemRows) => {

  const {
    getNewRow,
  } = useRowValues();


  const lastRowName = `${estArrayFieldName}.${rowsCount - 1}`;

  const lastRow = useWatch({
    name: lastRowName as 'items.0.test',
  });

  useEffect(() => {

    const equal = isEqual(lastRow, getNewRow());
    if (!equal) {
      handleAppendItem();
    }
  }, [lastRow, getNewRow, handleAppendItem]);

  return (
    <Stack direction="row" justifyContent={'flex-end'}>
      <HotKeyTooltip title='insert'>
        <Button
          variant="contained"
          color="success"
          //disabled={!!envStatus}
          startIcon={<AddIcon />}
          onClick={handleAppendItem}
        >
          行追加
        </Button>
      </HotKeyTooltip>
    </Stack>
  );
};