import { Grid } from '@mui/material';
import { FormikRadio } from 'kokoas-client/src/components/ui/radio';
import {
  StoreSelect,
  KeywordSearch,
  TantouSelects,
} from '.';
import { customerTypes } from '../form';
import { RecordStatus } from './RecordStatus';
import { TerritorySelect } from './TerritorySelect';

export const Fields = () => {
  return (
    <Grid container item
      spacing={2}
      xs={12}
      alignItems={'center'}
      justifyContent="flex-start"

    >
      <Grid item xs={12} md={3}>
        <FormikRadio name="custType" label="種別で絞り込む" choices={customerTypes} />
      </Grid>

      <Grid item xs={12} md={1}>
        <TerritorySelect />
      </Grid>

      <Grid item xs={12} md={2}>
        <StoreSelect />
      </Grid>


      <TantouSelects />


      <RecordStatus />

      <KeywordSearch />

    </Grid>
  );
};