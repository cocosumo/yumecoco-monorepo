import { Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormContext, Controller } from 'react-hook-form';
import { territories } from 'types';
import { TypeOfForm } from '../../../schema';


export const Territories = () => {

  const { 
    control,
  } = useFormContext<TypeOfForm>();


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
            {territories?.map((territory) => {
              return (
                <Grid 
                  key={territory} 
                  xs={'auto'}
                >
                  <FormControlLabel 
                    control={(
                      <Checkbox 
                        checked={territoriesVal?.includes(territory) ?? false}
                        value={territory}
                      />
                    )} 
                    label={territory}
                    onChange={(_, checked) => {
                      const newVal = checked 
                        ? [...(territoriesVal ?? []), territory] 
                        : (territoriesVal ?? []).filter((t) => t !== territory);
                        
                      onChange(newVal); 
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