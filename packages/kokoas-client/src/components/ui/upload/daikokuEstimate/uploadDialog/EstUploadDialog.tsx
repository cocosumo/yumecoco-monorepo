import { Dialog, DialogContent, DialogProps, DialogTitle, IconButton } from '@mui/material';
import { EstUploadDialogContent } from './EstUploadDialogContent';
import CloseIcon from '@mui/icons-material/Close';
export const EstUploadDialog = (props: DialogProps) => {
  const {
    onClose,
  } = props;
  return (
    <Dialog
      fullWidth
      maxWidth={'lg'}
      PaperProps={{
        sx: {
          height: '90vh',
        },
      }}
      {...props}
    >
      <DialogTitle>

        大黒から原価明細をアップロードします
        <IconButton
          onClick={(e) => onClose?.(e, 'escapeKeyDown')}
          sx={{
            position: 'absolute',
            top: '8px',
            right: '16px',
          }}
        >
          <CloseIcon />
        </IconButton>

      </DialogTitle>
      <DialogContent>
        <EstUploadDialogContent />
      </DialogContent>

    </Dialog>
  );
};