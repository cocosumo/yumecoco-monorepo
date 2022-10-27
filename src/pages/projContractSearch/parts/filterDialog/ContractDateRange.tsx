import { FormControl, FormLabel, Stack } from '@mui/material';
import { FormikJADatePicker } from '../../../../components/ui/datetimepickers/FormikJADatePicker';
import { KeyOfForm } from '../../form';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

export const ContractDateRange = () => {

  const [fromField, toField ]: KeyOfForm[] = ['contractDateFrom', 'contractDateTo'];

  return (
    <FormControl>
      <FormLabel>
        契約日
      </FormLabel>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <FormikJADatePicker label={''} name={fromField} />
        <DoubleArrowIcon color={'inherit'} />
        <FormikJADatePicker label={''} name={toField} />
      </Stack>
    </FormControl>

  );
};