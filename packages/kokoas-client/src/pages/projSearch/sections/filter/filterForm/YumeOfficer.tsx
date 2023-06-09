import { 
  FormControl, 
  InputLabel, 
  ListSubheader, 
  MenuItem, 
  Select,
  Typography, 
} from '@mui/material';
import { useYumeByStore } from '../../../hooks/useYumeByStore';
import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../../schema';

const inputLabel = 'ゆめてつAG';

export const YumeOfficer = ({
  includeRetired,
}: {
  includeRetired: boolean
}) => {
  const {
    control,
  } = useFormContext<TypeOfForm>();
  const { data } = useYumeByStore(includeRetired);

  return (
    <Controller 
      control={control}
      name='yumeAG'
      render={() => (
        <FormControl 
          fullWidth 
          size='small'
        >
          <InputLabel id="yumeAG">
            {inputLabel}
          </InputLabel>
          <Select
            labelId="yumeAG"
            label={inputLabel}
            multiple
          >
            {data && data.map(([store, content]) => {

              const {
                options,
              } = content;

              return (
                <div key={store}>
                  <ListSubheader>
                    {store} 
                  </ListSubheader>
                  {options.map(({ isRetired, label, value }) => {
                    return (
                      <MenuItem key={value} value={value}>
                        {label}
                        {isRetired && (
                        <Typography ml={2} sx={{ color: 'text.secondary' }}>
                          退職者
                        </Typography>
                        )}
                      </MenuItem>
                    );
                  })}
                </div>);
 
            })}
        
          </Select>
        </FormControl>
      )}
    
    />
    
  );
};