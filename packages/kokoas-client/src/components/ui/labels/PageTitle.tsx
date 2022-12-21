
import { Grid, Typography } from '@mui/material';
import { useEffect } from 'react';

interface PageTitleProps {
  color?: string,
  textColor?: string,
  label: string
  secondaryLabel?: string,
}

export const PageTitle = (props: PageTitleProps) => {
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
    <Grid item xs={12} p={2}
      sx={{ backgroundColor: color }}
    >
      <Typography color={textColor} variant="h4">
        {label}
      </Typography>
    </Grid>
  );
};

export default PageTitle;