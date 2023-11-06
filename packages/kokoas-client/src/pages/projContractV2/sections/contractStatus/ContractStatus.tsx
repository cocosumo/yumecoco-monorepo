import {  Stack } from '@mui/material';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { useContractById } from 'kokoas-client/src/hooksQuery';
import { TSignMethod } from 'types';
import { grey } from '@mui/material/colors';
import { Info } from '../../parts/Info';
import { useMemo } from 'react';
import { ExistingContracts } from './ExistingContracts';
import { ContractFlow } from './ContractFlow';

export const ContractStatus = () => {

  const contractId = useWatch<TypeOfForm>({
    name: 'contractId',
  }) as string;

  const { data: contractData } = useContractById(contractId || '');
  
  const {
    signMethod,
    envelopeId,
  } = contractData || {};



  const parsedSignMethod = useMemo(() => {
    const sM = signMethod?.value as TSignMethod;
    if (!sM) return;
    if (sM === 'electronic') return '電子契約';
    if (sM === 'wetInk') return '紙印刷';
  }, [signMethod?.value]); 
  
  return (
    <Stack
      p={2}
      border={1}
      borderColor={grey[300]}
      bgcolor='white'
      spacing={2}
    >
      

      <ContractFlow />

      <Info 
        label='署名手法'
        value={parsedSignMethod || '-'}
      />

      <Info 
        label='契約ID'
        value={contractId as string || '-'}
      />
      <Info 
        label='Docusign ID'
        value={envelopeId?.value || '-'}
      />

      <ExistingContracts />



    </Stack>
    
  );
};