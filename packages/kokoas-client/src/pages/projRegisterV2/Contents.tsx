import { PageSubTitle2 } from 'kokoas-client/src/components';
import { CustomerSummary } from './sections/CustomerSummary';
import { ProjectLocation } from './sections/ProjectLocation';
import { ProjectInformation } from './sections/ProjectInformation';

export const Contents = () => {
  return (
    <>
      <PageSubTitle2 label={'顧客情報'} />
      <CustomerSummary />

      <PageSubTitle2 label={'工事場所情報'} />
      <ProjectLocation />

      <PageSubTitle2 label={'関連工事'} />
      <ProjectInformation />

      <PageSubTitle2 label={'備考欄'} />

      <PageSubTitle2 label={'ログ'} />


    </>
  );
};