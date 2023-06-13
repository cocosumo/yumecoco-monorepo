import { Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import { useProjTypes } from 'kokoas-client/src/hooksQuery';
import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../../schema';


export const ProjType = () => {
  const { control } = useFormContext<TypeOfForm>();
  const { data } = useProjTypes({
    select: (d) => {
      return d.map(({ label, uuid }) => ({
        label: label.value,
        key: uuid.value,
      }));
    },
  });


  return (
    <FormGroup>
      <FormLabel>
        工事種別
      </FormLabel>
      <Controller 
        name="projTypes"
        control={control}
        render={({
          field: {
            value,
            onChange,
          },
        }) => (
          <Grid container>
            {data?.map(({ key, label }) => {
              return (
                <Grid 
                  key={key} 
                  xs={6}
                  md={3}
                >
                  <FormControlLabel 
                    control={(
                      <Checkbox 
                        checked={(value ?? []).includes(label)}
                        value={label}
                      />
                    )} 
                    label={label.replace('工事', '')}
                    onChange={(_, checked) => {
                      const newValue = checked
                        ? [...(value ?? []), label]
                        : (value ?? []).filter((t) => t !== label);

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