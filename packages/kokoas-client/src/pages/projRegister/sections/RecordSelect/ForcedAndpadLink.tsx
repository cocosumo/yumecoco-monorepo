import { Button, Tooltip } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useState } from 'react';
import { CompareProjToAndpad } from 'kokoas-client/src/components/ui/dialogs/CompareProjToAndpad.tsx/CompareProjToAndpad';

export const ForcedAndpadLink = () => {
  const [open, setOpen] = useState(false);
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
          onClick={()=>setOpen(true)}
        >
          Andpadとの強制接続
        </Button>
      </Tooltip>
      <CompareProjToAndpad open={open} onClose={()=>setOpen(false)}  />

    </div>

  );
};