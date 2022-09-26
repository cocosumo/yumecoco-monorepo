
import {  Grid } from '@mui/material';
import { PageSubTitle } from '../../../../components/ui/labels/';
import { ConstructionAgent } from './ConstructionAgent';
import { FormikLabeledCheckBox } from '../../../../components/ui/checkboxes';
import { useEffect, useState } from 'react';
import { APPIDS, KintoneRecord } from '../../../../api/kintone';
import { FormikSelect } from '../../../../components/ui/selects';
import { FormikTextField } from '../../../../components/ui/textfield';
import { TypeOfProjForm, getFieldName, KeyOfProjForm } from '../../form';
import { GetEmployeesParams } from '../../../../api/kintone/employees/GET';
import { useFormikContext } from 'formik';


export const ConstructionInfo = (
  props : {
    storeId: string,
    constructionTypeId?: string,
    territory?:  GetEmployeesParams['territory'],

  },
) => {
  const { storeId, territory, constructionTypeId } = props;
  const [constructionTypeOptions, setConstructionTypeOptions] = useState<Options>();
  const {
    status,
    setFieldValue,
    values: {
      cocoConst1,
    } } = useFormikContext<TypeOfProjForm>();

  const isReadOnly = (status as TFormStatus ) === 'disabled';


  /*Todo: Refactor this as custom hook */
  useEffect(()=>{
    KintoneRecord.getRecords({
      app: APPIDS.constructionType,
      query: 'order by レコード番号 asc',
    }).then((res) => {
      const rawConstOpts = res.records as unknown as ConstructionTypes.SavedData[];
      setConstructionTypeOptions(
        rawConstOpts
          .map(({ label, $id, projectName })=> ({ label: label.value, value: $id.value, hiddenValue: projectName.value })),
      );
    });
  }, []);


  useEffect(()=>{
    const selectedPojType =  constructionTypeOptions?.find(item => item.value === constructionTypeId);
    const projTypeName = selectedPojType?.hiddenValue || selectedPojType?.label;
    setFieldValue('constructionType' as KeyOfProjForm, projTypeName);
  }, [constructionTypeId]);


  return (
    <>
      <PageSubTitle label='工事情報' />
      <Grid container item spacing={2}
        xs={12}
        md={6} 
      >
        <Grid item xs={12} md={8} >
          <FormikSelect name={'constructionTypeId' as KeyOfProjForm} label={'工事種別'} disabled={isReadOnly}
            options={constructionTypeOptions} required
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextField name={'constructionName' as KeyOfProjForm} label="工事名称" placeholder="氏名/会社名様邸　工事種別"
            disabled={isReadOnly} required
          />
        </Grid>
      </Grid>

      <Grid container item xs={12}
        spacing={2}
      >
        {
          [1, 2].map((num) => (
            <Grid key={num} item xs={12}
              md={4}
            >
              <ConstructionAgent number={num} {...{ storeId, territory }} disabled={(!cocoConst1 && num === 2) || isReadOnly} />
            </Grid>
          ))
        }

        <Grid item xs={12} md={4}>
          <FormikLabeledCheckBox name={getFieldName('isAgentConfirmed')} label="工事担当者を確定する" helperText='※工事担当者が未定の場合はチェックしないでください。'
            disabled={isReadOnly}
          />

        </Grid>

      </Grid>


    </>
  );

};