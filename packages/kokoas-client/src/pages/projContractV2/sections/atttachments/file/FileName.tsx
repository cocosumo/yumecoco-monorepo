import { Typography } from '@mui/material';

export const FileName = ({ 
  fileName,
}:{
  fileName: string;
}) => {
  return (
    <Typography
      component={'span'}
      fontSize={10}
      color={'secondary'}
      textAlign={'center'}
      maxWidth={75}
      overflow={'hidden'}
      textOverflow={'ellipsis'}
      whiteSpace={'nowrap'}
      display={'block'}
    >
      {fileName}
    </Typography>
  );
};