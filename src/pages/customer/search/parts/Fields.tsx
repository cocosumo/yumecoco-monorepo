import { Grid } from '@mui/material';
import {
  StoreSelect,
  CustType,
  KeywordSearch,
  TantouSelects,
} from '.';
import { RecordStatus } from './RecordStatus';

export const Fields = () => {
  return (
    <Grid container item 
      spacing={2}
      xs={12}
      alignItems={'center'} 
      justifyContent="flex-start" 
    
    >
      <CustType />
      <StoreSelect />
      <TantouSelects />
      <RecordStatus />
      <KeywordSearch />
    </Grid>
  );
};