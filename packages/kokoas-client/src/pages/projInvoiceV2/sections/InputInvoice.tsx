import { Fragment } from 'react';
import { DisplaySection } from './InputInvoice/DisplaySection';
import { InputSection } from './InputInvoice/InputSection/InputSection';
import { Remarks } from './InputInvoice/Remarks';
import { Summary } from './InputInvoice/Summary';
import { Divider } from '@mui/material';



export const InputInvoice = () => {

  return (
    <Fragment>
      <Divider />

      <DisplaySection />
      <InputSection />
      <Remarks />
      <Summary />
    </Fragment>
  );
};
