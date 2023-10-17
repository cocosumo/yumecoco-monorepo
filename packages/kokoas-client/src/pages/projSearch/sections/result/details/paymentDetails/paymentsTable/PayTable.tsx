
import { useAndpadPaymentsBySystemId } from 'kokoas-client/src/hooksQuery';
import { PayTableBody } from './PayTableBody';
import { PayTableContainer } from './PayTableContainer';
import { PayTableFooter } from './PayTableFooter';
import { IOrder, PayTableHead } from './PayTableHead';
import { useState } from 'react';



export const PayTable = ({
  systemId,
  projId,
}:{
  systemId: string | number,
  projId: string,
}) => {
  const [orderDetails, setOrderDetails] = useState<IOrder>({
    orderBy: 'paymentDate',
    order: 'asc',
  });
  const { data } = useAndpadPaymentsBySystemId(systemId);

  const handleChangeOrder = (newOrder: IOrder) => {
    setOrderDetails(newOrder);
  };
  
  return (
    <PayTableContainer
      head={(
        <PayTableHead 
          handleChangeOrder={handleChangeOrder}
          orderDetails={orderDetails}
        />)}
      body={(
        <PayTableBody 
          projId={projId}
          records={data || []}
          orderDetails={orderDetails}
        />)}
      footer={<PayTableFooter records={data || []} />}
    />
  );
};