import { useContractsByProjIdV2 } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { StaticContentContainer } from 'kokoas-client/src/components/ui/information/StaticContentContainer';
import { Button, LinearProgress } from '@mui/material';
import { Contracts } from './Contracts';
import { useState } from 'react';
import { useNavigateWithQuery } from 'kokoas-client/src/hooks';
import { StaticContentActions } from 'kokoas-client/src/components';
import { NewContractButton } from './NewContractButton';

export const ContractsSummary = () => {
  const [
    projId,
    projName,
  ] = useTypedWatch({
    name: [
      'projId',
      'projName',
    ],
  }) as string[];

  const { data, isLoading } = useContractsByProjIdV2(projId);
  const [selectedContractId, seSelectedContractId] = useState(data?.[0]?.uuid.value);
  const navigate = useNavigateWithQuery();

  const handleChange = (_: unknown, newValue: string) => {
    seSelectedContractId(newValue);
  };


  return (
    <StaticContentContainer>
      {isLoading && (<LinearProgress />)}
      {!!data?.length && !isLoading && (
      <Contracts 
        data={data}
        selectedContractId={selectedContractId}
        handleChange={handleChange}
      />)}
      {!data?.length && !isLoading && '契約がありません'}
  
      <StaticContentActions>
        {selectedContractId && (
          <Button
            onClick={() => navigate('projContractPreviewV2', {
              contractId: selectedContractId,
            })}
            variant='outlined'
          >
            編集
          </Button>
        )}
        <NewContractButton 
          projId={projId}
          projName={projName}
        />
      </StaticContentActions>
    </StaticContentContainer>
  );
};