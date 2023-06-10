import { 
  FormControl, 
  InputLabel, 
  ListSubheader, 
  MenuItem, 
  Select,
  Typography, 
} from '@mui/material';
import { useYumeByStore } from '../../../hooks/useYumeByStore';

const inputLabel = 'ゆめてつAG';

export const YumeOfficer = ({
  includeRetired,
}: {
  includeRetired: boolean
}) => {
  const { data } = useYumeByStore(includeRetired);

  return (
    <FormControl fullWidth size='small'>
      <InputLabel id="yumeAg">
        {inputLabel}
      </InputLabel>


      <Select
        labelId="yumeAg"
        label={inputLabel}
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
  );
};
