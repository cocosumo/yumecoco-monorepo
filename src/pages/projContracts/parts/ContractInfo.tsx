import { Grid, Grow } from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { OutlinedDiv } from '../../../components/ui/containers';
import { TypeOfForm } from '../form';

export const ContractInfo = () => {
  const { values: { projEstimateId } } = useFormikContext<TypeOfForm>();


  useEffect(() => {
    if (projEstimateId) {

    }

  }, [projEstimateId]);


  return (
    <Grow in={!!projEstimateId}>
      <Grid item xs={12} >
        <OutlinedDiv label='契約内容'>

        </OutlinedDiv>
      </Grid>
    </Grow>
  );
};