import { Checkbox, FormControlLabel, FormGroup, FormLabel, Stack } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks/useTypedHooks';
import { ranks } from 'types';


export const RankField = () => {
  const { control } = useTypedFormContext();

  return (
    <FormGroup>
      <FormLabel>
        ランク
      </FormLabel>
      <Controller 
        name="ranks"
        control={control}
        render={({ 
          field:{
            value,
            onChange,
          }, 
        }) => (
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
          >
            {[...ranks, ''].map((r) => {

              return (
                <FormControlLabel
                  key={r}
                  control={(
                    <Checkbox 
                      checked={(value ?? []).includes(r) ?? false}
                      value={r}
                    />
                  )}
                  label={r || '無し'}
                  onChange={(_, checked) => {
                    const newValue = checked
                      ? [...(value ?? []), r]
                      : (value ?? []).filter((t) => t !== r);
                    onChange(newValue);

                  }}
                />
              );
            })}

          </Stack>
        )}
      />
    </FormGroup>
  );
};