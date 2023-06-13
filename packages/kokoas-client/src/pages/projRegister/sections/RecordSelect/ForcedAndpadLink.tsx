import { Button, Tooltip } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useState } from 'react';
import { SelectAndpadProject } from 'kokoas-client/src/components/ui/dialogs';

export const ForcedAndpadLink = ({
  projId,
}:{
  projId: string
}) => {
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
      <SelectAndpadProject open={open} projId={projId} onClose={()=>setOpen(false)}  />

    </div>

  );
};