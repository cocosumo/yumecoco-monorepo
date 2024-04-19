import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { produce } from 'immer';
import { useRowValues } from '../../../inputGrid/useRowValues';

export const InsertRow = () => {

  const { getValues, setValue } = useTypedFormContext();
  const { getNewRow } = useRowValues();
  
  const handleInsert = () => {
    const items = getValues('items');
    // I didn't find a built-in way in react-data-grid to get selected cell so I will use querySelector,
    // however, this might break if the specifications of the grid changes.
    const selectedCell = document.querySelector('div[role="grid"] div[aria-selected="true"]');
    let parsedRowIdx = items.length;

    if (selectedCell) {
      const selectedRow = selectedCell.parentElement as HTMLDivElement;

      const gridRowIdx = selectedRow.getAttribute('aria-rowindex');
      parsedRowIdx = Number(gridRowIdx) - 1;
    }

    setValue('items', produce(items, draft => {
      draft.splice(parsedRowIdx, 0, getNewRow());
    }));
    

  };

  return (
    <Button 
      variant={'contained'}
      color='info'
      startIcon={<AddIcon />}
      onClick={handleInsert} // TODO: Implement insert row
    >
      {'行を追加'}
    </Button>
  );
};
