import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useState } from 'react';
import { SelectAndpadProject } from 'kokoas-client/src/components/ui/dialogs';
import { useSaveProject } from 'kokoas-client/src/hooksQuery';
import { LoadingButton } from '@mui/lab';
import { AndpadButtonContainer } from './AndpadButtonContainer';

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

  const handleClick = () => setOpen(true);

  return (
    <>

      <AndpadButtonContainer
        emphasis='登録あるの場合'
        disabled={disabled}
        disabledMessage='既に接続しているため、強制接続が出来ません'
        onClick={handleClick}
      >
        <LoadingButton
          color='warning'
          startIcon={<WarningAmberIcon />}
          variant='outlined'
          disabled={disabled}
          onClick={handleClick}
          loading={isLoading}
        >
          Andpadとの強制接続
        </LoadingButton>
      </AndpadButtonContainer>
 

      <SelectAndpadProject 
        open={open} 
        projId={projId} 
        onClose={()=>setOpen(false)}
        onSelectSystemId={handleSaveForcedAndpadLink}
      />

    </>

  );
};