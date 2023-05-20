import { Chip, Stack } from '@mui/material';
import { ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyOfForm, TypeOfForm } from '../../form';
import qs from 'qs';
import { parseValueToLabel } from '../../helpers/parseValueToLabel';
import { stepsKeys } from '../filterDialog/ContractStatusIncomplete';
import { useNewValuesFromParams } from '../../hooks/useNewValuesFromParams';
import { filterNonNull } from 'libs';

export const FilterChips = () => {

  const values = useNewValuesFromParams();

  const navigate = useNavigate();

  /**
   * チップの✖をクリックしたときの処理
   */
  const handleDelete = useCallback((key: KeyOfForm) => {

    // keyを除いたオブジェクトを作成

    const { [key]: _, ...query } = values;

    let newQuery = query;

    // keyがcontractで始まる場合は、falseをセット
    if (key.startsWith('contract')) {
      if (key === 'contractIncomplete') {
        // 未完了の場合は、細かい進捗もfalseにする
        stepsKeys.forEach((stepKey) => {
          newQuery = { ...newQuery, [stepKey]: false };
        });

      } else {
        // それ以外の場合は、keyをfalseにする
        newQuery = { ...query, [key]: false };
      }
    }

    navigate(`?${qs.stringify(filterNonNull(newQuery))}`);
  }, [values, navigate]);

  const handleDeleteStore = (value: string) => {
    const newForm: TypeOfForm = { 
      ...values, 
      stores: values
        ?.stores
        ?.filter((store) => store !== value),   
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
          const parsedValue = parseValueToLabel(k as KeyOfForm, v);
  

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
                    onDelete={() => handleDeleteStore(value)}
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
                  onDelete={() => handleDelete(k as KeyOfForm)}
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