import { useAddressPostalCode } from 'kokoas-client/src/hooksQuery';
import { Dispatch, useEffect } from 'react';
import { Actions, TypeOfForm } from '../addressReducer';

export const useMatchWithFormAddress = ({
  postalCode,
  address,
  dispatch,
  state,
  open,
} : {
  open: boolean,
  postalCode?: string,
  address?: string,
  state: TypeOfForm,
  dispatch: Dispatch<Actions>
}) => {

  const { data: newAddress } = useAddressPostalCode(
    postalCode || '',
    {
      enabled: open && !state.postalCode,
    },
  );

  useEffect(() => {

    if (!open || !postalCode || !address) return;

    //dispatch({ type: 'syncForm', payload: { 'address': address, postalCode } });
    console.log('newAddress');
  }, [open, postalCode, address,  dispatch, newAddress]);

};