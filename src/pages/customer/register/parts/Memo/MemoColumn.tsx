import { Grid, Button　} from '@mui/material';
import { PageSubTitle } from '../../../../../components/ui/labels';
import AddIcon from '@mui/icons-material/Add';
import { MemoList } from './MemoList';
import { useContext } from 'react';
import { MemoContext } from './memoForm/MemoContext';


export const MemoColumn = () => {
  const { handleOpen } = useContext(MemoContext);

  return (
    <Grid container item xs={12} spacing={2} mt={2}>
      <PageSubTitle label={'メモ'} xs={7}/>
      <Grid item xs={5}>
        <Button variant="outlined" startIcon={< AddIcon />} fullWidth onClick={handleOpen}>追加</Button>
      </Grid>
      <Grid item xs={12}>
        <MemoList memos={[
          {
            id: '1',
            commenter: 'Lorenz',
            createDate: '2022-04-16T16:00',
            content: '出来たよね。ねねねねねねね。',
            title: 'メール',
          },
          {
            id: '2',
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