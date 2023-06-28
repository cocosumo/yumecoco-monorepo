import { useContractsByProjIdV2 } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { StaticContentContainer } from 'kokoas-client/src/components/ui/information/StaticContentContainer';
import { StaticContentActions } from 'kokoas-client/src/components/ui/information/StaticContentActions';
import { Button } from '@mui/material';

export const ContractsSummary = () => {
  const projId = useTypedWatch({
    name: 'projId',
  }) as string;

  const { data } = useContractsByProjIdV2(projId);

  return (
    <StaticContentContainer>
      {data?.length}
      <StaticContentActions>
        <Button
          size='small'
          variant='outlined'
        >
          編集
        </Button>
      </StaticContentActions>
    </StaticContentContainer>
  );
};