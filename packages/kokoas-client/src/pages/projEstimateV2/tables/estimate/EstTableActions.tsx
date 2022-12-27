import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { HotKeyTooltip } from 'kokoas-client/src/components';
import { useWatch } from 'react-hook-form';
import { estArrayFieldName, Item } from '../../form';
import { useRowValues } from '../../hooks/useRowValues';
import { UseManipulateItemRows } from '../../hooks/useManipulateItemRows';
import { useLazyEffect } from 'kokoas-client/src/hooks';



export const EstTableActions = ({
  rowsCount,
  handleAppendItem,
}: UseManipulateItemRows) => {

  const {
    getNewRow,
  } = useRowValues();


  const lastRowName = `${estArrayFieldName}.${rowsCount - 1}`;

  const lastRow: Item = useWatch({
    name: lastRowName as 'items.0.test',
  });

  /** 自動行追加 */
  useLazyEffect(() => {
    if (+lastRow.costPrice !== 0) {
      handleAppendItem();
    }
  }, [lastRow, getNewRow, handleAppendItem], 500);

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