import { Stack } from '@mui/material';
import { FinancingMethod } from '../fields/FinancingMethod';
import { ControlledTextField } from '../fields/ControlledTextField';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PrintIcon from '@mui/icons-material/Print';
import { SaveButton } from './SaveButton';


export const InputForm = () => {

  
  return (
    <Stack spacing={2}>
      <FinancingMethod />
      <ControlledTextField
        name='financialInstitution'
        label='金融機関名'
      />
      <ControlledTextField
        name='branchName'
        label='支店名'
      />
      <ControlledTextField
        name='tel'
        label='tel'
        startIcon={<LocalPhoneIcon />}
      />
      <ControlledTextField
        name='fax'
        label='fax'
        startIcon={<PrintIcon />}
      />
      <SaveButton />
    </Stack>
  );
};