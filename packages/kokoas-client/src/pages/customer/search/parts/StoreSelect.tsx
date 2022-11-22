
import { Box, Chip } from '@mui/material';
import { useFormikContext } from 'formik';
import { useStoreOptions } from 'kokoas-client/src/hooksQuery';
import { useEffect } from 'react';
import { FormikSelect } from '../../../../components/ui/selects';

import { FormFieldKeys, TypeOfForm } from '../form';




export const StoreSelect = () => {
  const { 
    values: {
      territory,
    }, 
    setValues,
  } = useFormikContext<TypeOfForm>();

  const { data: stores } = useStoreOptions({
    territory,
  });

  useEffect(() => {
    /* Filter storeIds based on available store options */
    setValues((prev) => ({
      ...prev,
      storeId: prev.storeId.filter(sId => stores?.some(s => s.value === sId)),
    }));
  },
  [stores, setValues]);

  return (
    <FormikSelect
      name={'storeId' as FormFieldKeys}
      label='店舗'
      multiple
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {(selected as string[]).map((selItem) => (
            <Chip key={selItem} label={stores?.find(({ value }) => value === selItem )?.label} />
          ))}
        </Box>
      )}
      options={stores}
    />

  );
};