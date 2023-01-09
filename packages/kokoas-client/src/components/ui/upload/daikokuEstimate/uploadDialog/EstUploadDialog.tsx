import { Dialog, DialogContent, DialogProps, DialogTitle } from '@mui/material';

export const EstUploadDialog = (props: DialogProps,
) => {
  return (
    <Dialog
      fullWidth
      maxWidth={'md'}
      PaperProps={{
        sx: {
          height: '80vh',
        },
      }}
      {...props}
    >
      <DialogTitle>
        大黒から見積をアップロードします
      </DialogTitle>
      <DialogContent>
        Content
      </DialogContent>

    </Dialog>
  );
};