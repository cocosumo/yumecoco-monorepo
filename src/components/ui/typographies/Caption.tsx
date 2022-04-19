import { Typography } from '@mui/material';

interface TypographyProps {
  text: string,
}

export  function Caption({ text }:TypographyProps) {
  return (
    <Typography variant="caption">{text}</Typography>
  );
}