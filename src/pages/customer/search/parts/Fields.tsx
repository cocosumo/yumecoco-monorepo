import { Grid } from '@mui/material';
import {
  StoreSelect,
  CustType,
  TantouKokoAG,
  TantouKokoConstruction,
  KeywordSearch,
} from '.';
import { RecordStatus } from './RecordStatus';
import { TantouYumeAG } from './TantouYumeAG';

export const Fields = () => {
  return (
    <Grid container item xs={12} alignItems={'center'} justifyContent="flex-start" spacing={2}>
      <CustType/>
      <StoreSelect />
      <TantouKokoAG />
      <TantouKokoConstruction/>
      <TantouYumeAG />
      <RecordStatus/>
      <KeywordSearch/>
    </Grid>
  );
};