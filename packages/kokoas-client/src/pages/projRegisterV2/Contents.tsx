import { CustomerSummary } from './sections/CustomerSummary';
import { ProjectLocation } from './sections/projectLocation/ProjectLocation';
import { ProjectInformation } from './sections/projectInformation/ProjectInformation';
import { PageSubTitle3 } from 'kokoas-client/src/components';
import { Memo } from './sections/memo/Memo';
import { AndpadSummary } from './sections/projectLocation/andpadSummary/AndpadSummary';
import { useTypedWatch } from './hooks/useTypedRHF';
import { CancelStatus } from './sections/cancelStatus.tsx/CancelStatus';

export const Contents = () => {
  const projId = useTypedWatch({
    name: 'projId',
  });



  return (
    <>
      {projId && (
        <>
          <PageSubTitle3 label={'Andpad情報'} />
          <AndpadSummary />
        </>
      )}


      <PageSubTitle3 label={'顧客情報'} />
      <CustomerSummary />

      <PageSubTitle3 label={'工事場所情報'} />
      <ProjectLocation />

      <PageSubTitle3 label={'工事情報'} />
      <ProjectInformation />

      <PageSubTitle3 label={'メモ'} />
      <Memo />
      
      <PageSubTitle3 label={'状態'} />
      <CancelStatus />


    </>
  );
};