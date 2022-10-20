import {  Dialog, DialogContent, DialogTitle, IconButton, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { useContractPreview } from '../../hooks';
import useDeepCompareEffect from 'use-deep-compare-effect';
import CloseIcon from '@mui/icons-material/Close';
import { SelectDocuments } from './SelectDocuments';
import { Loading } from './Loading';
import { useBackdrop } from '../../../../hooks';
import { PreviewFooter } from './PreviewFooter';
import { RefreshButton } from './RefreshButton';


export const ContractDialog = ({
  open, handleClose,
}: {
  open: boolean,
  handleClose: () => void
}) => {
  const { backdropState: { open: backdropOpen } } = useBackdrop();
  const { values } = useFormikContext<TypeOfForm>();

  const {
    previewUrl,
    previewLoading,
    handlePreview,
    handleRefetch,
  } = useContractPreview();

  useDeepCompareEffect(()=>{
    if (open) {
      handlePreview(values);
    }

  }, [values, open]);

  const isBusy = backdropOpen || previewLoading;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={'lg'}
      disablePortal
      sx={{
        zIndex: 5001, // So it will be above the App bar
      }}
    >
      <DialogTitle>
        <Stack direction="row" spacing={2}>
          <RefreshButton loading={previewLoading} handleRefetch={handleRefetch} />
          {!isBusy &&  <SelectDocuments />}

        </Stack>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          height: '100vh',
          overflow: 'hidden',
          p: 0,
        }}
      >
        {!isBusy &&
        <embed
          src={previewUrl}
          width="100%"
          height='100%'
        />}
        {isBusy && <Loading />}
      </DialogContent>

      {!isBusy &&
        <PreviewFooter />}
    </Dialog>
  );

};