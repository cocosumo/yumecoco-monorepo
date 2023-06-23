import { CustomerSummary } from './sections/CustomerSummary';
import { ProjectLocation } from './sections/ProjectLocation';
import { ProjectInformation } from './sections/ProjectInformation';
import { LogDisplay } from './sections/logs/LogDisplay';
import { PageSubTitle3 } from 'kokoas-client/src/components';

export const Contents = () => {
  return (
    <>
      <PageSubTitle3 label={'顧客情報'} />
      <CustomerSummary />

      <PageSubTitle3 label={'工事場所情報'} />
      <ProjectLocation />

      <PageSubTitle3 label={'関連工事'} />
      <ProjectInformation />

      <PageSubTitle3 label={'備考欄'} />

      <PageSubTitle3 label={'ログ'} />
      <LogDisplay />


    </>
  );
};