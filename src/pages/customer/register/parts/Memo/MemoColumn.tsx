import { Grid, Button　} from '@mui/material';
import { PageSubTitle } from '../../../../../components/ui/labels';
import AddIcon from '@mui/icons-material/Add';
import { MemoList } from './MemoList';
import { useContext } from 'react';
import { MemoContext } from './memoForm/MemoContext';
import { useFormikContext } from 'formik';
import { CustomerForm } from '../../form';


export const MemoColumn = () => {
  const { values: { id, customers } } = useFormikContext<CustomerForm>();
  const { handleOpen } = useContext(MemoContext);

  return (
    <Grid container item xs={12} spacing={2} mt={2}>
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
      <Grid item xs={12}>
        <MemoList memos={[
          {
            memoId: '1',
            commenter: 'Lorenz',
            createDate: '2022-04-16T16:00',
            content: '出来たよね。ねねねねねねね。',
            title: 'メール',
          },
          {
            memoId: '2',
            commenter: 'Lorenz',
            createDate: '2022-04-16T16:00',
            content: '出来たよね。ねねねねねねね。',
            title: 'メール',
          },
        ]} />
      </Grid>

    </Grid>



  );
};