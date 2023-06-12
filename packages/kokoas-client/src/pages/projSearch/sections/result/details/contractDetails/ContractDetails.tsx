import { Stack } from '@mui/material';
import { EditButton } from '../common/EditButton';
import { ContractList } from './ContractList';
import { useContractsByProjIdV2 } from 'kokoas-client/src/hooksQuery';

export const ContractDetails = ({
  projId,
}:{
  projId: string,
}) => {
  const { data } = useContractsByProjIdV2(projId);
  console.log(data);

  return (
    <Stack spacing={2}>
      <EditButton href='' />
      <ContractList />
    </Stack>
  );
};