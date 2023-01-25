import { Stack, FormControlLabel, Checkbox } from '@mui/material';
import { ComponentProps, useState } from 'react';

export const CopyDialogContent = ({
  handleChangeIsSameProj,
  defaultChecked,
}: {
  handleChangeIsSameProj: (checked: boolean) => void,
  defaultChecked: boolean,
}) => {

  const [checked, setChecked] = useState(defaultChecked);

  const handleChange: ComponentProps<typeof Checkbox>['onChange'] = (event) => {
    setChecked(event.target.checked);
    handleChangeIsSameProj(event.target.checked);
  };

  return (
    <Stack spacing={2}>
      <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label="同じ工事" />
    </Stack>
  );
};