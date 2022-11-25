import { Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { FormikSearchProjField } from '../../../components/ui/textfield/FormikSearchProjField';
import { getFieldName, TypeOfForm } from '../form';
import { NoCustomerWarning } from './NoCustomerWarning';


export const SearchProject = () => {

  const { values } = useFormikContext<TypeOfForm>();

  const {
    projName, projId, customerName,
  } = values;


  return (
    <Stack spacing={1}>
      <FormikSearchProjField
        label='工事情報の検索'
        name={getFieldName('projId')}
        projName={projName}
      />
      {!!projId && !customerName && !!projName &&
      <NoCustomerWarning projId={projId} />}
    </Stack>
  );
};