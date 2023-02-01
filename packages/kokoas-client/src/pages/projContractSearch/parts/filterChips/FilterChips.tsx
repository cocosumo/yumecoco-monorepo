import { Chip, Stack } from '@mui/material';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { ReactNode } from 'react';
import { fieldNameToJa, KeyOfForm, parseValue, TypeOfForm } from '../../form';

export const FilterChips = () => {

  const values = useURLParams<TypeOfForm>();


  return (
    <Stack direction={'row'} spacing={1} mt={2}>
      {Object.entries(values)
        .reduce((acc, [k, v]) => {

          const parsedValue = parseValue(k as KeyOfForm, v);
          if (parsedValue) {
            acc.push(
              <Chip
                size={'small'}
                key={k}
                label={`${fieldNameToJa(k as KeyOfForm)}：${parsedValue}`}
              />);
          }
          return acc;
        },
        [] as ReactNode[],
        )}
    </Stack>
  );
};