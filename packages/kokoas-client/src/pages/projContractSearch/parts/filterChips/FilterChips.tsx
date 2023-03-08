import { Chip, Stack } from '@mui/material';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyOfForm, TypeOfForm } from '../../form';
import qs from 'qs';
import { parseValueToLabel } from '../../helpers/parseValueToLabel';

export const FilterChips = () => {

  const values = useURLParams<TypeOfForm>();

  const navigate = useNavigate();

  const handleDelete = useCallback((key: KeyOfForm) => {

    // keyを除いたオブジェクトを作成
    const { [key]: _, ...query } = values;

    let newQuery = query;

    // keyがcontractで始まる場合は、falseをセット
    if (key.startsWith('contract')) {
      newQuery = { ...query, [key]: false };
    }

    navigate(`?${qs.stringify(newQuery)}`);
  }, [values, navigate]);

  return (
    <Stack
      direction={'row'}
      spacing={1}
      flexWrap={'wrap'}
      alignItems={'center'}
      my={1}
    >
      {Object.entries(values)
        .sort(([k1], [k2]) => {
          return k1.localeCompare(k2);
        })
        .reduce((acc, [k, v]) => {
          const parsedValue = parseValueToLabel(k as KeyOfForm, v);
          if (parsedValue) {
            acc.push(
              <Chip
                sx={{ my: 1 }}
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