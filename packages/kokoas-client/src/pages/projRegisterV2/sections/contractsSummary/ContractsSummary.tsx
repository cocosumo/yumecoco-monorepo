import { useContractsByProjIdV2 } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { StaticContentContainer } from 'kokoas-client/src/components/ui/information/StaticContentContainer';
import { LinearProgress } from '@mui/material';
import { Contracts } from './Contracts';

export const ContractsSummary = () => {
  const projId = useTypedWatch({
    name: 'projId',
  }) as string;

  const { data, isLoading } = useContractsByProjIdV2(projId);

  return (
    <StaticContentContainer>
      {isLoading && (<LinearProgress />)}
      {data && !isLoading && (<Contracts data={data} />)}
    </StaticContentContainer>
  );
};