import { Chip, Stack } from '@mui/material';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyOfForm, parseValue, TypeOfForm } from '../../form';
import qs from 'qs';

export const FilterChips = () => {

  const values = useURLParams<TypeOfForm>();
  const navigate = useNavigate();

  const handleDelete = useCallback((key: KeyOfForm) => {
    const { [key]: _, ...query } = values;
    navigate(`?${qs.stringify(query)}`);
  }, [values, navigate]);

  return (
    <Stack direction={'row'} spacing={1} mt={2}>
      {Object.entries(values)
        .reduce((acc, [k, v]) => {
          const parsedValue = parseValue(k as KeyOfForm, v);
          if (parsedValue) {
            acc.push([k, parsedValue]);
          }
          return acc;
        },
        [] as Array<[string, string]>,
        )
        .sort(([k1], [k2]) => {
          return k1.localeCompare(k2);
        })
        .map(([k, value]) => {
          return (
            <Chip
              size={'small'}
              key={k}
              label={value}
              onDelete={() => handleDelete(k as KeyOfForm)}
            />
          );
        })}
    </Stack>
  );
};