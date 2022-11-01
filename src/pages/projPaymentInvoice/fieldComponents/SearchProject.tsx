import { Stack } from '@mui/material';
import { FormikSearchProjField } from '../../../components/ui/textfield/FormikSearchProjField';
import { getFieldName, TypeOfForm } from '../form';

export const SearchProject = ({
  values,
}: {
  values: TypeOfForm
}) => {

  /* 
    ※projEstimateより流用、要修正
    const {
    isLoading,
    handleStartLoading,
    values,
  } = useUpdateProjectId(); */

  const { projName } = values;


  return (
    <Stack spacing={1}>
      <FormikSearchProjField
        label='工事情報の検索'
        name={getFieldName('projId')}
        projName={projName}
      /* isLoading={isLoading}
      disabled={isLoading}
      handleChange={handleStartLoading} */
      />
      {/* {!!projId && !customerName && !isLoading &&
      <NoCustomerWarning projId={projId} />} */}
    </Stack>
  );
};