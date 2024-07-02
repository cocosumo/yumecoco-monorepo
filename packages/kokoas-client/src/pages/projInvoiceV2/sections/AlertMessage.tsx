import { Fragment } from 'react';
import { useTypedWatch } from '../hooks/useTypedRHF';
import { Alert } from '@mui/material';



export const AlertMessage = () => {

  const [
    paymentStatus,
  ] = useTypedWatch({
    name: [
      'paymentStatus',
    ],
  }) as [string];

  const hasPayment = paymentStatus !== '';

  return (
    <Fragment>
      {hasPayment &&
        <Alert severity='error'>
          入金情報が存在するため、変更できません。
        </Alert>}
    </Fragment>
  );


};
