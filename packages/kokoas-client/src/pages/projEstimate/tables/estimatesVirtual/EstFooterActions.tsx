import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { HotKeyTooltip } from 'kokoas-client/src/components';
import { useWatch } from 'react-hook-form';
import { estArrayFieldName, Item } from '../../form';
import { useRowValues } from '../../hooks/useRowValues';
import { UseManipulateItemRows } from '../../hooks/useManipulateItemRows';
import { useLazyEffect } from 'kokoas-client/src/hooks';
import { grey } from '@mui/material/colors';



export const EstFooterActions = ({
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
    <Stack 
      direction="row" 
      justifyContent={'flex-end'}
      sx={{
        border: 1,
        borderRadius: 1,
        borderColor: grey[200],
        p: 1,
        mt: 1,
      }}
    >
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