import { Stack } from '@mui/material';
import { SearchProjects } from 'kokoas-client/src/components/reactHookForm';
import { TypeOfForm } from '../form';
import { useFormContext } from 'react-hook-form';
import { EstimatesInfo } from '../staticComponents/EstimatesInfo';
import { ButtonMenu } from '../fields/ButtonMenu';

export const HeadSection = () => {
  const { control } = useFormContext<TypeOfForm>();

  return (
    <Stack 
      direction={'row'} 
      spacing={2}
      justifyContent={'space-between'}
    >
      <SearchProjects
        controllerProps={{
          name: 'projId',
          control,
        }}
      />
      <EstimatesInfo />

      <ButtonMenu />


    </Stack>
  );
};