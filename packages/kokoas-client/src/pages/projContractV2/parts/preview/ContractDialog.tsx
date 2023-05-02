import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PreviewContent } from './PreviewContent';



export const ContractDialog = ({
  open,
  //formLoading,
  //previewUrl,
  //selectedDoc,
  //handleRefetch,
  handleClose,
  //handlePreview,
}: {
  open: boolean,
  //formLoading: boolean,
  //previewUrl: string,
  //selectedDoc: string,
  //handleRefetch: () => void,
  handleClose: () => void,
  //handlePreview: (fileKey: string) => void,
}) => {

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
        {/*         <PreviewHeader
          isBusy={formLoading}
          handleRefetch={handleRefetch}
          handleClosePreview={handleClose}
        /> */}
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

      <PreviewContent />
      {/* <DialogContent
        sx={{
          height: '100vh',
          overflow: 'hidden',
          p: 0,
        }}
      >
                {!formLoading &&
        <embed
          src={previewUrl}
          width="100%"
          height='100%'
        />}
        {formLoading && <Loading />}
      </DialogContent> */}

      {/*       {!formLoading && (
      <PreviewFooter >
        <SelectDocuments
          handlePreview={handlePreview}
          selectedDoc={selectedDoc}
        />
      </PreviewFooter>
      )} */}
    </Dialog>
  );

};