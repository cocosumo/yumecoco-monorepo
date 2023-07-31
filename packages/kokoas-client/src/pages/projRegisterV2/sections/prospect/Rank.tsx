import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks';
import { InputLabel, Rating, Stack, Typography } from '@mui/material';
import { fieldMapJa } from '../../api/fieldMapJa';
import { rankingValues } from '../../api/rankingValues';
import { grey } from '@mui/material/colors';

const name = 'rank';
const label = fieldMapJa[name];

export const Rank = () => {
  const { 
    control,
  } = useTypedFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: {
          onChange,
          value,
          ref,
        },
      }) => {
        
        const parsedValue = rankingValues.findIndex((v) => v === value);
        
        return (
          <Stack 
            direction="row"
            spacing={2}
            alignContent={'center'}
          >
            <Stack>
              <InputLabel>
                {label}
              </InputLabel>
          
              <Rating
                name={name}
                size='large'
                ref={ref}
                value={parsedValue}
                onChange={(_, newValue) => {
              
                  onChange(rankingValues[newValue || 0]);
                }}
                max={4}
              />
            </Stack>
            {!!value && (
            <Typography
              fontWeight='bold'
              fontSize={30}
              color={grey[700]}
              px={2}
              border={1}
              borderRadius={2}
              borderColor={grey[500]}
            >
              {value}
            </Typography>
            )}
           
          </Stack>
        ); 
      }}
    />
  );
};