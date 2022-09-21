import { Stack } from '@mui/material';
import { FormikSearchProjField } from '../../../components/ui/textfield/FormikSearchProjField';
import { getFieldName } from '../form';
import { useUpdateProjectId } from '../hooks/useUpdateProjectId';
import { NoCustomerWarning } from './NoCustomerWarning';

export const SearchProject = ({
  projName, projId, customerName,
}: {
  projName: string,
  customerName: string,
  projId: string,
}) => {

  const { isLoading, handleStartLoading } = useUpdateProjectId();


  return (
    <Stack spacing={1}>
      <FormikSearchProjField
        label='工事情報の検索'
        name={getFieldName('projId')}
        projName={projName}
        isLoading={isLoading}
        disabled={isLoading}
        handleChange={handleStartLoading}
      />
      {!!projId && !customerName && !isLoading &&
      <NoCustomerWarning projId={projId} />}
    </Stack>
  );
};