import { Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../../schema';
import { useStoreOptions } from '../../../hooks/useStoreOptions';
import { useStoresGrpByTerritory } from '../../../hooks/useStoresGrpByTerritory';
import { territories } from 'types';


export const Stores = () => {

  const { control, setValue, getValues } = useFormContext<TypeOfForm>();

  const { data: stores } = useStoreOptions();
  const { data: groupedStores } = useStoresGrpByTerritory();

  return (
    <FormGroup >
      <FormLabel>
        店舗
      </FormLabel>
      <Controller 
        name="stores"
        control={control}
        render={({
          field: {
            value,
            onChange,
          },
        }) => (
          <Grid container>
     
            {stores?.map(({ key, label }) => {
              return (
                <Grid 
                  key={key} 
                  xs={'auto'}
                >
                  <FormControlLabel 
                    control={(
                      <Checkbox 
                        checked={(value ?? []).includes(label)}
                        value={label}
                      />
                    )} 
                    label={label}
                    onChange={(_, checked) => {
                      const newValue = checked
                        ? [...(value ?? []), label]
                        : (value ?? []).filter((t) => t !== label);
         
                      // side effect that sets territories
                      const territoriesVal = getValues('territories') ?? [];

                      if (!groupedStores) {
                        return;
                      }

                      territories
                        .forEach((territory) => {
                          if (groupedStores[territory].includes(label)) {

                            if (groupedStores[territory].every((store) => newValue.includes(store))) {
                              setValue('territories', [...territoriesVal, territory]);
                            } else {
                              setValue('territories', territoriesVal.filter((t) => t !== territory));

                            }
                          }
                        });

                      onChange(newValue);

                    }}
                  />
                </Grid>
              );
            })}
      
          </Grid>
        )}
      />


      
    </FormGroup>
  );
};