import { Stack } from '@mui/material';
import { ContractTypeField } from './ContractTypeField';
import { AdditionalContract } from './AdditionalContract';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../schema';

export const ContractType = () => {

  const contractType = useWatch<TypeOfForm>({
    name: 'contractType',
  }) as string;

  return (
    <Stack spacing={2}>
      <ContractTypeField />
      {contractType === '追加' && (
        <AdditionalContract />
      )}
    </Stack>
  );
};