import { Grid, Button, Stack } from '@mui/material';
import { PageSubTitle } from '../../../../../components/ui/labels';
import AddIcon from '@mui/icons-material/Add';

export const MemoColumn = () => {



  return (
    <Grid container item xs={12} spacing={2} mt={2}>
      <PageSubTitle label={'メモ'} xs={7}/>
      <Grid item xs={5}>
        <Button variant="outlined" startIcon={< AddIcon />} fullWidth>追加</Button>
      </Grid>
      <Grid item xs={12}>
        {[...Array(10)].map((i, index) => {
          return <Stack key={index}>
            Hello {i}
          </Stack>;
        })}

      </Grid>

    </Grid>



  );
};