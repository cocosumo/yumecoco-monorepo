import { Tooltip } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useState } from 'react';
import { SelectAndpadProject } from 'kokoas-client/src/components/ui/dialogs';
import { useSaveProject } from 'kokoas-client/src/hooksQuery';
import { LoadingButton } from '@mui/lab';

export const ForcedAndpadLink = ({
  projId,
  disabled = false,
  isLoading = false,
}:{
  projId: string,
  disabled?: boolean,
  isLoading?: boolean,
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
    <>
      <Tooltip title="Andpadで先に登録してしまった場合"> 
        <span>
          <LoadingButton
            color='warning'
            startIcon={<WarningAmberIcon />}
            variant='outlined'
            disabled={disabled}
            onClick={()=>setOpen(true)}
            loading={isLoading}
          >
            Andpadとの強制接続
          </LoadingButton>
        </span>
 
      </Tooltip>
      <SelectAndpadProject 
        open={open} 
        projId={projId} 
        onClose={()=>setOpen(false)}
        onSelectSystemId={handleSaveForcedAndpadLink}
      />

    </>

  );
};