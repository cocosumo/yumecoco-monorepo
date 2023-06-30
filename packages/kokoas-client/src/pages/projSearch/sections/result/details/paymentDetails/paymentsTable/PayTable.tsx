
import { useAndpadPaymentsBySystemId } from 'kokoas-client/src/hooksQuery';
import { PayTableBody } from './PayTableBody';
import { PayTableContainer } from './PayTableContainer';



export const PayTable = ({
  systemId,
}:{
  systemId: string | number,
}) => {

  const { data } = useAndpadPaymentsBySystemId(systemId);
  
  return (
    <PayTableContainer
      body={<PayTableBody />}
      footer={null}
    />
  );
};