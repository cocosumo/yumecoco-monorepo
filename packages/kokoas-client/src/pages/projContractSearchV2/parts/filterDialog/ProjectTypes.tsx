import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';
import { useProjTypes } from 'kokoas-client/src/hooksQuery';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks/useTypedHooks';

export const ProjectTypes = () => {
  const { control } = useTypedFormContext();
  const { data } = useProjTypes({
    select: useCallback((d) => {
      return d?.map(({
        uuid,
        label,
      }) => ({
        label: label.value,
        key: uuid.value,
      }));
    }, []),
  });



  return (
    <Controller 
      control={control}
      name='projTypes'
      render={({
        field: {
          onChange,
          value,
        },
      }) => {
       

        return (
          <FormGroup >
            <Grid container>
     
              {data?.map(({ key, label }) => {
                return (
                  <Grid 
                    key={key} 
                    item 
                    xs={6}
                    md={4}
                  >
                    <FormControlLabel 
                      control={(
                        <Checkbox 
                          checked={value?.includes(label) ?? false}
                          value={label} 
                          onChange={(e) => {
                            const { 
                              checked, 
                              value: checkValue, 
                            } = e.target;

                            const parsedValue = checked ? [...(value || []), checkValue] : (value ?? []).filter((v) => v !== checkValue);
    
                            onChange(parsedValue as string[]);

                          }}
                        />
                )} 
                      label={label}
                    />
                  </Grid>
                );
              })}
      
            </Grid>
          </FormGroup>
        );
      
      }}
    />
   
  );
};