import { Grid } from '@mui/material';
import { FormikSelect } from '../../../../components/ui/selects';
import { getFieldName } from '../form';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { recordStatuses } from '../../search/form';


export const RecordStatus = () => {
  const recordId  = useParams().recordId;
  const statusOptions = useRef<Options>(recordStatuses
    .map(item => ({ label: item, value: item })));

  return (
    <>
      {
    recordId &&
    <Grid container item xs={12} md={12} lg={12} xl={9} spacing={2}  alignItems="flex-start" justifyContent={'flex-start'}>
      <Grid item xs={12} md={8} lg={5} >
        <FormikSelect name={getFieldName('recordStatus')} label="ステータス" options={statusOptions.current}/>
      </Grid>
    </Grid>
      }
    </>

  );
};