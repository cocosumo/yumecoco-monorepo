import { Box, Stack, Typography } from '@mui/material';
import { useCustGroupById, useCustomersByCustGroupId, useProjById } from 'kokoas-client/src/hooksQuery';
import { Customers } from './Customers';

export const ProjectDetails = ({
  projId,
}:{
  projId: string
}) => {

  const { data: recProj } = useProjById(projId);

  const {
    custGroupId,
  } = recProj ?? {};

  const { data: recCustGroup } = useCustGroupById(custGroupId?.value ?? '');

  const { data: recCust } = useCustomersByCustGroupId(custGroupId?.value ?? '');

  return (
    <Stack 
      spacing={1}
    >
      {recCust && <Customers customers={recCust} />}
     

    </Stack>
  );
};