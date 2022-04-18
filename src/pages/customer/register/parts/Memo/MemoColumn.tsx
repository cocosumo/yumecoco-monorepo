import { Grid, Button, Stack } from '@mui/material';
import { PageSubTitle } from '../../../../../components/ui/labels';
import AddIcon from '@mui/icons-material/Add';
import { MemoList } from './MemoList';
import { useContext } from 'react';
import { MemoContext } from './memoForm/MemoContext';
import { useFormikContext } from 'formik';
import { CustomerForm } from '../../form';


export const MemoColumn = () => {
  const { values: { id, customers } } = useFormikContext<CustomerForm>();
  const { handleOpen, memoList } = useContext(MemoContext)!;

  

  return (
    <Grid item xs={12} xl={6}>
      <Stack spacing={2} direction={'column'}>

        <Grid container item xs={12} spacing={2}>
          <PageSubTitle label={'メモ'} xs={7}/>
          <Grid item xs={5}>
            <Button 
          variant="outlined" startIcon={< AddIcon />} 
          fullWidth onClick={
            ()=> handleOpen({ 
              recordId: id!, 
              custName: customers[0].custName, 
              
            })
          }
          >
              追加
            </Button>
          </Grid>
        </Grid>
     
        <MemoList memos={memoList ?? []} />
  
      </Stack>
    </Grid>



  );
};