import { ButtonWithToolTip } from 'kokoas-client/src/components/ui/buttons/ButtonWithSimpleToolTip';
import { BiExport } from '@react-icons/all-files/bi/BiExport';
import { useState } from 'react';
import { ExportEstimateMenu } from './ExportEstimateMenu';
import { useSnackBar } from 'kokoas-client/src/hooks';


export const ExportEstimate = () => {
  const { setSnackState } = useSnackBar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSnackState({
      open: true,
      severity: 'warning',
      message: '開発中です。',
    });
  };

  return (
    <>
      <ButtonWithToolTip 
        title={'出力'}
        variant='outlined'
        size='large'
        onClick={handleClick}
      >
        <BiExport size={24} />
      </ButtonWithToolTip>
      <ExportEstimateMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
      />  
    </>
  );
};