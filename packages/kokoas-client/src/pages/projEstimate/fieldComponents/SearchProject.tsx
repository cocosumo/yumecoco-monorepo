import { Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { SearchProjects } from 'kokoas-client/src/components/ui/textfield';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../Router';
import {  TypeOfForm } from '../form';
import { NoCustomerWarning } from './NoCustomerWarning';


export const SearchProject = () => {
  const navigate = useNavigate();
  const { values } = useFormikContext<TypeOfForm>();

  const {
    projName, projId, customerName,
  } = values;


  return (
    <Stack spacing={1}>
      <SearchProjects
        label='工事情報の検索'
        value={projId ? {
          id: projId,
          projName: projName,
        } : undefined}
        onChange={(_, opt) => {
          navigate(`${pages.projEstimate}?${generateParams({
            projId: opt?.id,
          })}`);
        }}
      />
      {!!projId && !customerName && !!projName &&
      <NoCustomerWarning projId={projId} />}
    </Stack>
  );
};