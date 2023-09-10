import { Typography } from '@mui/material';

import useFitText from 'use-fit-text';

export const FitText = ({
  content,
}:{
  content: string,
}) => {
  const {
    fontSize,
    ref,
  } = useFitText({
    minFontSize: 0,
  });

  return (
    <Typography
      ref={ref}
      fontSize={fontSize}
    >
      {content}
    </Typography>
  ); 
};