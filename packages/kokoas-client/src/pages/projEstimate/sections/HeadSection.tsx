import { Stack } from '@mui/material';
import { SearchProjects } from 'kokoas-client/src/components/reactHookForm';
import { useFormContext } from 'react-hook-form';
import { TForm } from '../schema';
import { EstimatesInfo } from '../staticComponents/EstimatesInfo';

export const HeadSection = () => {
  const { control } = useFormContext<TForm>();

  return (
    <Stack 
      direction={'row'} 
      spacing={2}
      justifyContent={'flex-start'}
    >
      <SearchProjects
        controllerProps={{
          name: 'projId',
          control,
        }}
      />
      <EstimatesInfo />


    </Stack>
  );
};