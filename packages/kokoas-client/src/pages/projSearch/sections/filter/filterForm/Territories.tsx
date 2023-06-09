import { Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../../schema';
import { useStoresGrpByTerritory } from '../../../hooks/useStoresGrpByTerritory';
import { territories } from 'types';
import { isPartialArray } from 'libs/src/isPartialArray';


export const Territories = () => {

  const { 
    control,
    setValue,
    getValues,
  } = useFormContext<TypeOfForm>();

  const { data } = useStoresGrpByTerritory();
  const stores = useWatch({
    name: 'stores',
    control,
  });


  if (!data) return null;

  return (
    <FormGroup >
      <FormLabel>
        領域
      </FormLabel>
      <Controller 
        name='territories'
        control={control}
        render={({ 
          field : {
            value: territoriesVal,
            onChange,
          }, 
          
        }) => (
        
          <Grid container>
            {territories
              ?.map((territory) => {

                const partial = isPartialArray(data[territory], stores  ?? []); 

                return (
                  <Grid 
                    key={territory} 
                    xs={'auto'}
                  >
                    <FormControlLabel 
                      control={(
                        <Checkbox 
                          checked={territoriesVal?.includes(territory) ?? false}
                          indeterminate={partial}
                          value={territory}
                        />
                    )} 
                      label={territory}
                      onChange={(_, checked) => {
                        const newTerritoriesVal = checked
                          ? [...(territoriesVal ?? []), territory]
                          : (territoriesVal ?? []).filter((t) => t !== territory);
                        onChange(newTerritoriesVal);

                        // side effect that sets stores
                        const storesVal = getValues('stores');
                        const updatedStoresVal = checked
                          ? [...new Set([...(storesVal ?? []), ...data[territory]])]
                          : (storesVal ?? []).filter((store) => !data[territory].includes(store));
                        setValue('stores', updatedStoresVal);
                      
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