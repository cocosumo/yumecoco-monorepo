import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormLabel, Stack, Typography, Skeleton } from '@mui/material';
import { useState, useEffect, forwardRef } from 'react';
import { getCustGroup } from '../../../../../api/kintone/custgroups/GET';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { DetailsContent } from './DetailsContent';

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
  const [record, setRecord] = useState<CustomerGroupTypes.SavedData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(()=>{
    if (custGroupId){
      setLoading(true);
      getCustGroup(custGroupId)
        .then(resp => {
          console.log('triggered!');
          setLoading(false);
          setRecord(resp.record as unknown as CustomerGroupTypes.SavedData);
        });
    }
  }, [custGroupId]);


  return (
    <Dialog
      TransitionComponent={Transition}
      onClose={handleClose}
      open={open && !loading}
      maxWidth="md"
    >
      <DialogTitle>
        <Stack spacing={2} direction="row" justifyContent={'space-between'}>
          <Typography variant='h6' >契約者の詳細</Typography>
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
        {loading && <Skeleton />}

        <DetailsContent record={record} loading={loading} />

      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>閉じる</Button>
      </DialogActions>

    </Dialog>
  );
};
