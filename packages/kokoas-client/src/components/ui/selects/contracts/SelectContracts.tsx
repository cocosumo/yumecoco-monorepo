import { FormControl, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useNavigate } from 'react-router-dom';

export interface SelectContractsProps {
  projId: string,
}

export const SelectContracts = (
  props: SelectContractsProps & SelectProps,
) => {
  const navigate = useNavigate();

  const {
    projId,
    value = '', 
    variant = 'outlined',
    label = '契約',
    placeholder = 'fuck',
    onChange = (e) => {
      const selected = e.target.value as string;
      navigate(`?${generateParams({ projId, projEstimateId: selected })}`);
    },
    ...othersProps
  } = props;

  return (

    <FormControl fullWidth>
      <InputLabel>
        {label}
      </InputLabel>
      <Select
        {...othersProps}
        fullWidth
        variant={variant}
        label={label}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      >
        <MenuItem value={''}>
          ----
        </MenuItem>

      </Select>

    </FormControl>
  );
};