import { 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select,
  Typography, 
} from '@mui/material';
import { useCocoEmpGrpByArea } from '../../../hooks/useCocoEmpGrpByArea';

const inputLabel = 'ここすも担当者';

export const CocoOfficer = ({
  includeRetired,
}: {
  includeRetired: boolean
}) => {
  const { data } = useCocoEmpGrpByArea(includeRetired);

  return (
    <FormControl fullWidth size='small'>
      <InputLabel id="cocoAg">
        {inputLabel}
      </InputLabel>


      <Select
        labelId="cocoAg"
        label={inputLabel}
      >
        {data && [
          ...data['西'],
          ...data['東'],
        ].map(({
          label,
          value,
          isRetired,
        }) => {
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
        
      </Select>
    </FormControl>
  );
};
