import { Button, Dialog, DialogTitle } from '@mui/material';
import { useCallback, useState } from 'react';
import { SelectProjectsContent } from './SelectProjectsContent';

export const SelectProjects = ({
  custGroupId,
}: {
  custGroupId?: string
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);
  const handleOpen = useCallback(() => setOpen(true), []);

  return (
    <>
      <Button
        variant='contained'
        color={'secondary'}
        onClick={handleOpen}
        disabled={!custGroupId}
      >
        工事情報の選択
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={'sm'}
        fullWidth
      >
        <DialogTitle>
          編集する工事を選択してください
        </DialogTitle>

        <SelectProjectsContent
          custGroupId={custGroupId || ''}
          handleClose={handleClose}
        />

      </Dialog>
    </>
  );
};