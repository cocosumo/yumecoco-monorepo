import { StaticContentContainer } from 'kokoas-client/src/components';
import { LedgerRadioButton } from './LedgerRadioButton';
import { Alert } from '@mui/material';



export const LedgerInformation = () => {
  return (
    <StaticContentContainer>
      <Alert severity='info'>
        受発注管理を大黒さんで行う場合は、大黒さんを選択してください
      </Alert>
      <LedgerRadioButton
        name='ledgerInfo'
      />
    </StaticContentContainer>
  );
};
