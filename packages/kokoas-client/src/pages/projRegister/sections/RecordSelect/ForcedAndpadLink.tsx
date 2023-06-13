import { Button, Tooltip } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export const ForcedAndpadLink = () => {
  return (
    <div>
      <Tooltip title="Andpadで先に登録してしまった場合"> 

 
        <Button
          fullWidth
          color='warning'
          startIcon={<WarningAmberIcon />}
          variant='outlined'
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          Andpadとの強制接続
        </Button>
      </Tooltip>


    </div>

  );
};