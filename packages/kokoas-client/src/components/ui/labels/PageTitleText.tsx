import { Typography, TypographyProps } from '@mui/material';

export const PageTitleText = (props : Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h4" {...props} />);