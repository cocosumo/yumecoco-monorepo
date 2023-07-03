import { Button, Tooltip } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useState } from 'react';
import { SelectAndpadProject } from 'kokoas-client/src/components/ui/dialogs';
import { useSaveProject } from 'kokoas-client/src/hooksQuery';

export const ForcedAndpadLink = ({
  projId,
  disabled = false,
}:{
  projId: string,
  disabled?: boolean,
}) => {
  const [open, setOpen] = useState(false);

  const { mutate: saveProject } = useSaveProject();
  const handleSaveForcedAndpadLink = (systemId: string) => {
    saveProject({
      projId,
      record: {
        forceLinkedAndpadSystemId: { value: systemId },
      },
    });
  };

  return (
    <div>
      <Tooltip title="Andpadで先に登録してしまった場合"> 

 
        <Button
          fullWidth
          color='warning'
          startIcon={<WarningAmberIcon />}
          variant='outlined'
          disabled={disabled}
          sx={{
            whiteSpace: 'nowrap',
          }}
          onClick={()=>setOpen(true)}
        >
          Andpadとの強制接続
        </Button>
      </Tooltip>
      <SelectAndpadProject 
        open={open} 
        projId={projId} 
        onClose={()=>setOpen(false)}
        onSelectSystemId={handleSaveForcedAndpadLink}
      />

    </div>

  );
};