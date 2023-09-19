import { Typography } from '@mui/material';
import { RowLayout, RowLayoutProps } from './RowLayout';
import { grey } from '@mui/material/colors';

export const ResultRow = (props: RowLayoutProps) => {

  const {
    rank,
    ...otherProps
  } = props;

  return  (
    <RowLayout 
      rank={(
        <Typography 
          fontSize={24} 
          color={grey[500]} 
          fontWeight={'bold'}
          p={1}
          border={4}
          borderRadius={4}
          borderColor={grey[100]}
          bgcolor={'white'}
        >
          {rank || '-'}
        </Typography>
    )}
      {...otherProps}
    />);
};