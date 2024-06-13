import { Button, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';



export const AddButton = ({
  handleClick,
  disabled = false,
}: {
  handleClick: () => void
  disabled?: boolean
}) => {
  return (

    <Tooltip
      title={'請求項目を追加'}
    >
      {/* disabledの対策でspanを追加しています */}
      <span>
        <Button
          size='small'
          variant='outlined'
          color='secondary'
          startIcon={<AddIcon />}
          onClick={handleClick}
          disabled={disabled}
        >
          追加
        </Button>
      </span>
    </Tooltip>

  );
};