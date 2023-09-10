import { Typography } from '@mui/material';

import useFitText from 'use-fit-text';

export const FitText = ({
  content,
  color,
  bgColor,
}:{
  content: string,
  color?: string,
  bgColor?: string
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
      color={color}
      bgcolor={bgColor}
    >
      {content}
    </Typography>
  ); 
};