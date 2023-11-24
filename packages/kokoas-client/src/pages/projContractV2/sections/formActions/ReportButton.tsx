import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { TEnvelopeStatus } from 'types';
import { Button } from '@mui/material';
import RedeemIcon from '@mui/icons-material/Redeem';
import { useState } from 'react';
import { CertViewer } from 'kokoas-client/src/components/ui/dialogs/certViewer/CertViewer';


export const ReportButton = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const [
    contractId,
    envelopeStatus,
  ] = useWatch<TypeOfForm>({
    name: [
      'contractId',
      'envelopeStatus',
    ],
  }) as [string, TEnvelopeStatus];

  return (
    <>
      {envelopeStatus === 'completed' && (
      <Button
        variant="outlined"
        startIcon={<RedeemIcon />}
        onClick={handleOpen}
      >
        報告書
      </Button>
      )}
      <CertViewer 
        open={open}
        contractId={contractId}
        handleClose={handleClose}
      />
    </>
  );
};