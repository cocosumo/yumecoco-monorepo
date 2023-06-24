import { CustomerSummary } from './sections/CustomerSummary';
import { ProjectLocation } from './sections/projectLocation/ProjectLocation';
import { ProjectInformation } from './sections/projectInformation/ProjectInformation';
import { PageSubTitle3 } from 'kokoas-client/src/components';
import { Remarks } from './fields/Remarks';

export const Contents = () => {
  return (
    <>
      <PageSubTitle3 label={'顧客情報'} />
      <CustomerSummary />

      <PageSubTitle3 label={'工事場所情報'} />
      <ProjectLocation />

      <PageSubTitle3 label={'工事情報'} />
      <ProjectInformation />

      <PageSubTitle3 label={'備考欄'} />
      <Remarks />


    </>
  );
};