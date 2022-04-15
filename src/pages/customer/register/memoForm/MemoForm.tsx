import { Form } from 'formik';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Grid, Stack  } from '@mui/material';
import { useState } from 'react';
import { PageSubTitle } from '../../../../components/ui/labels';

export const MemoForm = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container item xs={12} md={3}  >
      <Stack>
        <PageSubTitle label='メモ'/>
        <Button onClick={handleClickOpen} >メモを追加</Button>

        <Form noValidate >

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
          </Dialog>
        </Form>

      </Stack>

    </Grid>
  );
};