
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect } from 'react';


/**
 * 新Gridを利用した見出しです。
 */
export const PageTitle2 = (props: {
  color?: string,
  textColor?: string,
  label: string
  secondaryLabel?: string,
}) => {
  const {
    color = '#9CDAF9',
    textColor = '#000',
    secondaryLabel,
    label,
  } =  props;

  useEffect(() => {
    document.title = [label, secondaryLabel].filter(Boolean).join(' - ');
  }, [label, secondaryLabel]);

  return (
    <Grid xs={12} p={2}
      sx={{ backgroundColor: color }}
    >
      <Typography color={textColor} variant="h4">
        {label}
      </Typography>
    </Grid>
  );
};