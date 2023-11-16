import { Chip, Stack } from '@mui/material';
import { ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { parseValueToLabel } from '../../helpers/parseValueToLabel';
import { useNewValuesFromParams } from '../../hooks/useNewValuesFromParams';
import { filterNonNull } from 'libs';
import { KForm, TForm } from '../../schema';

export const FilterChips = () => {

  const values = useNewValuesFromParams();

  const navigate = useNavigate();

  /**
   * チップの✖をクリックしたときの処理
   */
  const handleDelete = useCallback((key: KForm) => {

    // keyを除いたオブジェクトを作成

    const { [key]: _, ...query } = values;

    let newQuery = query;

    // keyがcontractで始まる場合は、falseをセット
    if (key.startsWith('contract')) {
      newQuery = { ...query, [key]: false };
    }

    navigate(`?${qs.stringify(filterNonNull(newQuery))}`);
  }, [values, navigate]);

  const handleDeleteArrayItem = (
    name: KForm, 
    value: string,
  ) => {
    const newForm: TForm = {
      ...values,
      [name]: (values[name] as string[])?.filter((v) => v !== value),
        
    };

    navigate(`?${qs.stringify(filterNonNull(newForm))}`);
  };

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
          const parsedValue = parseValueToLabel(k as KForm, v);
  
          if (parsedValue) {
            // check if parsedValue is an array of string
            if (Array.isArray(parsedValue)) {
              parsedValue.forEach((value) => {
                acc?.push(
                  <Chip
                    sx={{ my: 1 }}
                    size={'small'}
                    key={value}
                    label={value}
                    onDelete={() => handleDeleteArrayItem(k as KForm, value)}
                  />,
                );
              });
            } else {
              acc.push(
                <Chip
                  sx={{ my: 1 }}
                  size={'small'}
                  key={k}
                  label={parsedValue}
                  onDelete={() => handleDelete(k as KForm)}
                />,
              );
            }
          }
            
          return acc;
        },
        [] as ReactNode[])}
    </Stack>
  );
};