import { PageSubTitle2 } from 'kokoas-client/src/components';
import { CustomerSummary } from './sections/CustomerSummary';

export const FormInput = () => {
  return (
    <>
      <PageSubTitle2 label={'顧客情報'} />
      <CustomerSummary />
    </>
  );
};