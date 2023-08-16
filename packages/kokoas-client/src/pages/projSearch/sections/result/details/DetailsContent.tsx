import {  DialogContent } from '@mui/material';
import { grey } from '@mui/material/colors';
import { CustomerDetails } from './customerDetails/CustomerDetails';
import { useProjById } from 'kokoas-client/src/hooksQuery';
import { ProjectDetails } from './projectDetails/ProjectDetails';
import { EstimatesDetails } from './estimatesDetails/EstimatesDetails';
import { ContractDetails } from './contractDetails/ContractDetails';
import { PaymentDetails } from './paymentDetails/PaymentDetails';
import { CostMgtDetails } from './costMgtDetails/CostMgtDetails';

export const DetailsContent = ({
  projId,
  tabIdx,
}:{
  projId: string
  tabIdx: number,
}) => {


  const { data: recProj } = useProjById(projId);

  const {
    custGroupId,
  } = recProj ?? {};

  return (
    
    <DialogContent 
      dividers
      sx={{
        bgcolor: grey[50],
        height: '80vh',
        overflow: 'hidden',
        p: 0,
      }}
    >
      {tabIdx === 0 && custGroupId?.value && (
        <CustomerDetails 
          custGroupId={custGroupId.value}
        />
      )}

      {tabIdx === 1 && recProj && (
        <ProjectDetails recProj={recProj} />
      )}

      {tabIdx === 2 && (
        <EstimatesDetails projId={projId} />
      )}

      {tabIdx === 3 && (
        <ContractDetails projId={projId} />
      )}

      {tabIdx === 4 && (
        <PaymentDetails projId={projId} />
      )}

      {tabIdx === 5 && (
      <CostMgtDetails projId={projId} />
      )}

    </DialogContent>

   
  );
};