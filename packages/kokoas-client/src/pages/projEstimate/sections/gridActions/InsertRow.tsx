import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { produce } from 'immer';
import { useTypedFormContext } from '../../hooks';
import { initialRow } from '../../form';

/**
 * 
 * This is mostly identical with the insert row in "order" page.
 * We could refactor this into a shared component if time allows.
 * 
 */
export const InsertRow = () => {

  const { getValues, setValue } = useTypedFormContext();
  
  const handleInsert = () => {
    const items = getValues('items');

    const selectedCell = document.querySelector('div[role="grid"] div[aria-selected="true"]');
    let parsedRowIdx = items.length;

    if (selectedCell) {
      const selectedRow = selectedCell.parentElement as HTMLDivElement;

      const gridRowIdx = selectedRow.getAttribute('aria-rowindex');
      parsedRowIdx = Number(gridRowIdx) - 1;
    }

    setValue('items', produce(items, draft => {
      draft.splice(parsedRowIdx, 0, { ...initialRow });
    }));
    

  };

  return (
    <Button 
      variant={'contained'}
      color='info'
      startIcon={<AddIcon />}
      onClick={handleInsert} 
    >
      {'行を追加'}
    </Button>
  );
};
