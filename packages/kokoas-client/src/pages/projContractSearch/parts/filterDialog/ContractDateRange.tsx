import { FormControl, FormLabel, Stack } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { grey } from '@mui/material/colors';
import { DateRangeField } from './DateRangeField';

export const ContractDateRange = () => {

  return (
    <FormControl>
      <FormLabel>
        契約日
      </FormLabel>
      <Stack direction={'row'} spacing={1} alignItems={'flex-start'}>
        <DateRangeField name={'contractDateFrom'} />
        <DoubleArrowIcon htmlColor={grey[700]} />
        <DateRangeField name={'contractDateTo'} />
      </Stack>
    </FormControl>

  );
};