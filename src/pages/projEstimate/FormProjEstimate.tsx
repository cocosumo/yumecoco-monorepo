import { Divider, Grid } from '@mui/material';
import { FieldArray, Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { FabSave } from '../../components/ui/fabs/FabSave';
import { PageTitle } from '../../components/ui/labels';
import { FormikTextField } from '../../components/ui/textfield';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { getFieldName, initialValues } from './form';

export default function FormProjEstimate() {
  const { submitForm } = useFormikContext();

  console.log('initialValues.items', initialValues.items);

  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer>
        <PageTitle label='見積もり登録' />

        <Grid container item xl={8} spacing={2} mb={12}>
          <Grid item xs={12} md={4}>



            {/* 工事情報の検索 */}



          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormikTextField name={getFieldName('constructionType')} label="工事種別名" />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormikTextField name={getFieldName('profitRate')} label="利益率" />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormikTextField name={getFieldName('taxRate')} label="税率" />
          </Grid>
          <Grid item md={3} />


          <Grid item xs={12} md={12}>
            {/* 見積もり用のテーブル */}
            {/* 大項目(ルックアップ)｜中項目(ルックアップ)｜部材名(手入力)｜原価｜数量｜利益率｜単位｜税(課税・非課税)｜単価｜金額 */}
            <FieldArray
              name={getFieldName('items')}
              render={arrayHelpers => (
                <div>
                  {initialValues.items.map((item, index) => (
                    <div key={index}>
                      {/** both these conventions do the same */}
                      <FormikTextField name={`items[${index}].majorItem`} label="大項目" />
                      <FormikTextField name={`items.${index}.middleItem`} label="中項目" />

                      <button type="button" onClick={() => arrayHelpers.remove(index)}>
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push({ majorItem: '', middleItem: '' })}
                  >
                    +
                  </button>
                </div>
              )}
            />
          </Grid>


        </Grid>
        <FabSave onClick={submitForm} />
      </MainContainer>
    </Form>
  );
}