import { useFormikContext } from 'formik';
import { Divider, Grid } from '@mui/material';
import { FormikSelect } from '../../components/ui/selects';
import { getFieldName, TypeOfForm } from './form';
import { FormikMoneyField, FormikTextFieldV2 as FormikTextField } from '../../components/ui/textfield';
import { FormikJADatePicker } from '../../components/ui/datetimepickers';
import { FabSave } from '../../components/ui/fabs/FabSave';
import { ProspectShortcuts } from './parts/ProspectShortcuts';
import { FormContainer } from './FormContainer';
import { SearchProjects } from 'kokoas-client/src/components/ui/textfield/SearchProjects';
import { useNavigate } from 'react-router-dom';
import { pages } from '../Router';
import { generateParams } from 'kokoas-client/src/helpers/url';

export const FormProjProspect = () => {
  const navigate = useNavigate();
  const {
    submitForm,
    values,
    dirty,
  } = useFormikContext<TypeOfForm>();

  const { projId, projName } = values;
  const isDisabled = !projId;
  

  return (
    <FormContainer>

      <Grid item xs={12} md={4}>
        <SearchProjects 
          label='工事情報の検索'
          value={projId ? {
            id: projId,
            projName: projName,
          } : undefined}
          onChange={(_, opt) => {
            navigate(`${pages.projProspect}?${generateParams({
              projId: opt?.id,
            })}`);
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={12} md={4}>
        <FormikSelect disabled={isDisabled} label='ランク' name={getFieldName('rank')}
          options={['A', 'B', 'C', 'D'].map(o => ({ label: o, value: o }))}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <FormikMoneyField 
          disabled={isDisabled} 
          label="契約予定金額" 
          name={getFieldName('schedContractPrice')}
        />
      </Grid>

      <Grid item xs={4} />

      <Grid item xs={12} md={4}>
        <FormikJADatePicker disabled={isDisabled} label="不動産決済日" name={getFieldName('estatePurchaseDate')} />
      </Grid>
      <Grid item xs={12} md={4}>
        <FormikJADatePicker disabled={isDisabled} label="設計申込日" name={getFieldName('planApplicationDate')} />
      </Grid>

      <Grid item xs={12} md={4}>
        <FormikJADatePicker disabled={isDisabled} label="契約予定日" name={getFieldName('schedContractDate')} />
      </Grid>

      <Grid item xs={12} >
        <FormikTextField disabled={isDisabled} label="備考" name={getFieldName('memo')}
          multiline
        />
      </Grid>

      <ProspectShortcuts />

      <FabSave 
        appear={!!projId && !!dirty}
        onClick={()=> {
          submitForm();
        }} 
      />

    </FormContainer >
  );
};