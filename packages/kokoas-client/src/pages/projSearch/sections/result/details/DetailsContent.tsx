import {  DialogContent } from '@mui/material';
import { grey } from '@mui/material/colors';
import { CustomerDetails } from './customerDetails/CustomerDetails';
import { useProjById } from 'kokoas-client/src/hooksQuery';
import { ProjectDetails } from './projectDetails/ProjectDetails';
import { EstimatesDetails } from './estimatesDetails/EstimatesDetails';
import { ContractDetails } from './contractDetails/ContractDetails';
import { PaymentDetails } from './paymentDetails/PaymentDetails';
import { CostMgtDetails } from './costMgtDetails/CostMgtDetails';
import { DetailsTabs } from './DetailsDialog';
import { OrderDetails } from './orderDetails/OrderDetails';

export const DetailsContent = ({
  projId,
  tabValue,
}:{
  projId: string
  tabValue: DetailsTabs,
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
      {tabValue === '顧客' && custGroupId?.value && (
        <CustomerDetails 
          custGroupId={custGroupId.value}
        />
      )}

      {tabValue === '工事' && recProj && (
        <ProjectDetails recProj={recProj} />
      )}

      {tabValue === '見積' && (
        <EstimatesDetails projId={projId} />
      )}

      {tabValue === '契約' && (
        <ContractDetails projId={projId} />
      )}

      
      {tabValue === '発注' && (
        <OrderDetails projId={projId} />
      )}

      {tabValue === '入金' && (
        <PaymentDetails projId={projId} />
      )}

      {tabValue === '原価管理表' && (
      <CostMgtDetails projId={projId} />
      )}

    </DialogContent>

   
  );
};