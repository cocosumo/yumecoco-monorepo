import { Typography } from '@mui/material';

export const DraggingInfo = () => {
  return (
    <Typography 
      color={'GrayText'}
      textAlign={'center'}
      width={'100%'}
      height={30}
      fontWeight={'bold'}
    >
      ドロップしたら、ファイルをアップロードします。
    </Typography>
  );
};