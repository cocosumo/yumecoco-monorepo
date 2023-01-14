import {  Grid } from '@mui/material';
import { TProjRank } from 'types';
import { FormikCheckBoxes } from '../../../../components/ui/checkboxes';
import { FormikTextField } from '../../../../components/ui/textfield';
import { getFieldName } from '../../form';
import { DateRange } from '../common/DateRange';
import { PriceRange } from '../common/PriceRange';


export const FilterDialogContent = () => {

  const ranksOptions = (['A', 'B', 'C', 'D'] as TProjRank[])
    .map<Option>(r => ({ label: r, value: r }));

  return (

    <Grid container spacing={2} pt={2}>

      <Grid item xs={12}>
        <FormikCheckBoxes choices={ranksOptions} label="ランク" name={getFieldName('rank')} />
      </Grid>

      <Grid item xs={6} >
        <FormikTextField name={getFieldName('custGroupId')} label={'顧客番号'} size="small" />
      </Grid>

      <Grid item xs={6} >
        <FormikTextField name={getFieldName('projId')} label={'工事番号'} size="small" />
      </Grid>

      <Grid item xs={12} >
        <FormikTextField name={getFieldName('projName')} label={'工事名'} size="small" />
      </Grid>


      <PriceRange fieldNames={['schedContractPriceMin', 'schedContractPriceMax']} label={'契約予定金額'} />
      <DateRange fieldNames={['planApplicationDateMin', 'planApplicationDateMax']} label={'設計申し込み日'} />
      <DateRange fieldNames={['estatePurchaseDateMin', 'estatePurchaseDateMax']} label={'不動産決済日'} />
      <DateRange fieldNames={['schedContractDateMin', 'schedContractDateMax']} label={'契約予定日'} />

      <Grid item xs={12} >
        <FormikTextField name={getFieldName('memo')} label={'メモ'} size="small"
          multiline
        />
      </Grid>
    </Grid>

  );
};