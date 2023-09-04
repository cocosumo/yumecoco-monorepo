import { PaymentRemainderRecordType } from '../../config';

export const postContractToRemainderApp = ({
  projTypeContracts,
}:{
  projTypeContracts: Partial<PaymentRemainderRecordType>[]
}) => {
  const convertContracts = projTypeContracts.map(({
    uuid,
    andpadUrl,
    alertState,
    alertDate,
    contract, // updateKey
    projId,
    projType,
    totalContractAmount,
    expectedPaymentDate,
    andpadStatus,
    paymentTable,
    alertTarget,    
  }) => {


    
  });

};
