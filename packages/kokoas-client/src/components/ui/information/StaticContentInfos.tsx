import { Stack } from '@mui/material';
import { Info, InfoProps } from './Info';

export const StaticContentInfos = ({
  data,
}:{
  data: InfoProps[]
}) => {
  return (
    <Stack 
      spacing={1}
    >
      {data.map(({ label, value }) => (
        <Info key={label} label={label} value={value || '-'} />
      ))}
    </Stack>
  );
};