
import { useAndpadPaymentsBySystemId } from 'kokoas-client/src/hooksQuery';
import { PayTableBody } from './PayTableBody';
import { PayTableContainer } from './PayTableContainer';
import { PayTableFooter } from './PayTableFooter';
import { PayTableHead } from './PayTableHead';



export const PayTable = ({
  systemId,
}:{
  systemId: string | number,
}) => {

  const { data } = useAndpadPaymentsBySystemId(systemId);
  
  return (
    <PayTableContainer
      head={<PayTableHead />}
      body={<PayTableBody records={data || []} />}
      footer={<PayTableFooter records={data || []} />}
    />
  );
};