import { Chip, Stack } from '@mui/material';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { ReactNode, useCallback } from 'react';
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
    <Stack direction={'row'} spacing={1} my={2}>
      {Object.entries(values)
        .sort(([k1], [k2]) => {
          return k1.localeCompare(k2);
        })
        .reduce((acc, [k, v]) => {
          const parsedValue = parseValue(k as KeyOfForm, v);
          if (parsedValue) {
            acc.push(
              <Chip
                size={'small'}
                key={k}
                label={parsedValue}
                onDelete={() => handleDelete(k as KeyOfForm)}
              />);
          }
          return acc;
        },
        [] as ReactNode[],
        )}
    </Stack>
  );
};