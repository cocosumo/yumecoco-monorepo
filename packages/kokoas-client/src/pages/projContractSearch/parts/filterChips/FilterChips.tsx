import { Box, Chip, Stack } from '@mui/material';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { fieldNameToJa, KeyOfForm, parseValue, TypeOfForm } from '../../form';

export const FilterChips = ({
  control,
}: {
  control: UseFormReturn<TypeOfForm>['control']
}) => {
  const values = useWatch<TypeOfForm>({
    control,
  });


  return (
    <Stack direction={'row'} spacing={1} mt={2}>
      {Object.entries(values)
        .filter(([_, v]) => !!v)
        .map(([k, v]) => {

          return (
            <Chip
              size={'small'}
              key={k}
              label={`${fieldNameToJa(k as KeyOfForm)}：${parseValue(k as KeyOfForm, v)}`}
            />
          );
        })}
    </Stack>
  );
};