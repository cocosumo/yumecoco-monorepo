import { PageSubTitle2 } from 'kokoas-client/src/components';
import { CustomerSummary } from './sections/CustomerSummary';
import { ProjectLocation } from './sections/ProjectLocation';

export const Contents = () => {
  return (
    <>
      <PageSubTitle2 label={'顧客情報'} />
      <CustomerSummary />

      <PageSubTitle2 label={'工事場所情報'} />
      <ProjectLocation />

    </>
  );
};