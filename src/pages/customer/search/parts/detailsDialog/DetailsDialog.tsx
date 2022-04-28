import { IconButton, Button,
  Dialog, DialogActions, DialogContent,
  DialogTitle, FormLabel, Stack, Typography } from '@mui/material';
import {  forwardRef } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { DetailsTabs } from './DetailsTabs';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export const DetailsDialog = (props : {
  open: boolean,
  custGroupId?: string,
  handleClose: ()=>void,
}) => {
  const { custGroupId, open, handleClose } = props;


  return (
    <Dialog
      TransitionComponent={Transition}
      onClose={handleClose}
      open={open}
      maxWidth="md"
    >
      <DialogTitle>
        <Stack spacing={2} direction="row" justifyContent={'space-between'}>
          <Typography variant='h6' >詳細</Typography>
          <FormLabel sx={{ ml: 2 }}>id: {custGroupId}</FormLabel>
          <Link to={`/custgroup/edit/${custGroupId}`} target="_blank" rel="noopener noreferrer">
            <IconButton>
              <EditIcon/>
            </IconButton>
          </Link>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{
        scrollbarGutter: 'stable',
      }}>
        <DetailsTabs custGroupId={custGroupId}/>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>閉じる</Button>
      </DialogActions>

    </Dialog>
  );
};
