import { Stack } from '@mui/material';
import { FormikSearchProjField } from '../../../components/ui/textfield/FormikSearchProjField';
import { getFieldName } from '../form';
import { useUpdateProjectId } from '../hooks/useUpdateProjectId';
import { NoCustomerWarning } from './NoCustomerWarning';


export const SearchProject = () => {


  const {
    isLoading,
    values,
  } = useUpdateProjectId();



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
      {!!projId && !customerName && !isLoading && !!projName &&
      <NoCustomerWarning projId={projId} />}
    </Stack>
  );
};