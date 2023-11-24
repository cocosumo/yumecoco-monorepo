import { Divider } from '@mui/material';
import { PageSubTitle3 } from 'kokoas-client/src/components';
import { TotalAmount } from './sections/TotalAmount';
import { PaymentSchedule } from './sections/PaymentSchedule';
import { ConstructionPeriods } from './sections/ConstructionPeriods';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from './schema';
import { ContractType } from './sections/contractType/ContractType';
import { Memo } from './sections/Memo';
import { AttachmentHelp } from './sections/atttachments/AttachmentHelp';
import { Attachments } from './sections/atttachments/Attachments';
import { isProd } from 'config';

export const FormInput = () => {

  const envelopeStatus = useWatch<TypeOfForm>({
    name: 'envelopeStatus',
  });

  const hasContract = !!envelopeStatus;

  return (
    <>
      <Divider />
      <ContractType />

      <PageSubTitle3 label={'合計金額'} />
      <TotalAmount disabled={hasContract} />

      <PageSubTitle3 label={'支払い予定'} />
      <PaymentSchedule disabled={hasContract} />

      <PageSubTitle3 label={'工期'} />
      <ConstructionPeriods disabled={hasContract} />
            
      <PageSubTitle3 label={'備考'} />
      <Memo />

      {!isProd && (
        <>
          <PageSubTitle3 label={<AttachmentHelp />} />
          <Attachments />
        </>
      )}

  
      
      <Divider />

    </>
  );
};