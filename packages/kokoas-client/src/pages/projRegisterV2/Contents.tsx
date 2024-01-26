import { CustomerSummary } from './sections/customersSummary/CustomerSummary';
import { ProjectLocation } from './sections/projectLocation/ProjectLocation';
import { ProjectInformation } from './sections/projectInformation/ProjectInformation';
import { PageSubTitle3 } from 'kokoas-client/src/components';
import { Memo } from './sections/memo/Memo';
import { AndpadSummary } from './sections/andpadSummary/AndpadSummary';
import { useTypedWatch } from './hooks/useTypedRHF';
//import { CancelStatus } from './sections/cancelStatus/CancelStatus';
import { ContractsSummary } from './sections/contractsSummary/ContractsSummary';
import { OfficersInput } from './sections/officersInput/OfficersInput';
import { ProjectDates } from './sections/projectDates/ProjectDates';
import { Prospect } from './sections/prospect/Prospect';
import { LedgerInformation } from './sections/LedgerInformation/LedgerInformation';

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
          
          <PageSubTitle3 label={'台帳情報'} />
          <LedgerInformation />

          <PageSubTitle3 label={'契約情報'} />
          <ContractsSummary />
        </>
      )}


      <PageSubTitle3 label={'顧客情報'} />
      <CustomerSummary />

      <PageSubTitle3 label={'工事場所情報'} />
      <ProjectLocation />

      <PageSubTitle3 label={'工事情報'} />
      <ProjectInformation />

      <PageSubTitle3 label={'担当者情報'} />
      <OfficersInput />

      <PageSubTitle3 label={'メモ'} />
      <Memo />

      <PageSubTitle3 label={'工事日程'} />
      <ProjectDates />

      <PageSubTitle3 label={'見込み情報'} />
      <Prospect />

      
      {/* <PageSubTitle3 label={'状態'} /> */}
      {/* <CancelStatus /> */}


    </>
  );
};