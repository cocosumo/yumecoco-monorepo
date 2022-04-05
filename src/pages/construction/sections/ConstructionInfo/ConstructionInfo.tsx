
import {  Grid } from '@mui/material';
import PageSubTitle from '../../../../components/ui/labels/PageSubTitle';
import { ConstructionAgent } from './ConstructionAgent';
import { FormikLabeledCheckBox } from '../../../../components/ui/checkboxes';
import { useEffect, useState } from 'react';
import { APPIDS, KintoneRecord } from '../../../../api/kintone';
import { FormikSelect } from '../../../../components/ui/selects';
import { FormikTextField } from '../../../../components/ui/textfield';
import { KeyOfConstructionDetails } from '../../form';



export const ConstructionInfo = () => {
  const [constructionTypeOptions, setConstructionTypeOptions] = useState<Options>();

  useEffect(()=>{
    KintoneRecord.getRecords({
      app: APPIDS.constructionType,
    }).then((res) => {
      const rawConstOpts = res.records as unknown as ConstructionTypes.SavedData[];
      setConstructionTypeOptions(
        rawConstOpts
          .map(({ label, $id })=> ({ label: label.value, value: $id.value })),
      );
    });
  }, []);

  return (
    <>
      <PageSubTitle label='工事情報' />
      <Grid container item xs={12} md={6} spacing={2}>
        <Grid item xs={12} md={8} >
          <FormikSelect name={'constructionTypeId' as KeyOfConstructionDetails} label={'工事種別'} options={constructionTypeOptions} required />
        </Grid>
        <Grid item xs={12}>
          {/* <TextField fullWidth label="工事名称" placeholder='氏名/会社名様邸　工事種別' /> */}
          <FormikTextField name={'constructionName' as KeyOfConstructionDetails} label="工事名称" placeholder="氏名/会社名様邸　工事種別" />
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={2}>
        {
          [1, 2].map((num) => (
            <Grid key={num} item xs={12} md={4}>
              <ConstructionAgent number={num}/>
            </Grid>
          ))
        }

        <Grid item xs={12} md={4}>
          <FormikLabeledCheckBox name='confirmAgent' label="工事担当者を確定する" helperText='※工事担当者が未定の場合はチェックしないでください。'/>

        </Grid>

      </Grid>


    </>
  );

};