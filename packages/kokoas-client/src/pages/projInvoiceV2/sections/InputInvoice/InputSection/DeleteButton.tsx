import { Button, Tooltip } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';


export const DeleteButton = ({
  disabled,
  handleClick,
}: {
  disabled?: boolean
  handleClick: () => void,
}) => {

  return (
    <Tooltip title={disabled ? '項目が1つしかないため、削除できません' : '請求項目を削除'}>
      {/* disabledの対策でspanを追加しています */}
      <span>
        <Button
          size='small'
          variant='outlined'
          color='secondary'
          startIcon={<RemoveIcon />}
          onClick={handleClick}
          disabled={disabled}
        >
          削除
        </Button>
      </span>
    </Tooltip>
  );
};
