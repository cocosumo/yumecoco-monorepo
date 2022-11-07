import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { SelectProjectsContent } from './SelectProjectsContent';

export const SelectProjects = ({
  custGroupId,
}: {
  custGroupId?: string
}) => {
  const [open, setOpen] = useState(false);


  return (
    <>
      <Button
        variant='contained'
        color={'secondary'}
        onClick={() => setOpen(true)}
        disabled={!custGroupId}
      >
        工事情報の選択
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          編集する工事を選択してください
        </DialogTitle>

        <SelectProjectsContent custGroupId={custGroupId || ''} />

        <DialogActions>
          <Button>
            キャンセル
          </Button>
          <Button
            onClick={() => setOpen(false)}
          >
            選択
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};