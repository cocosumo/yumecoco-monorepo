import { Typography } from '@mui/material';
import { RowLayout, RowLayoutProps } from './RowLayout';
import { grey } from '@mui/material/colors';
import { useNavigateWithQuery } from 'kokoas-client/src/hooks';

export const ResultRow = (props: RowLayoutProps) => {

  const {
    rank,
    schedContractAmt,
    projId,
    ...otherProps
  } = props;
  
  const navigate = useNavigateWithQuery();

  const rankIsLong = (rank as string).length > 1;

  return  (
    <RowLayout 
      schedContractAmt={schedContractAmt?.toLocaleString()}
      rank={(
        <Typography 
          fontSize={rankIsLong ? 12 :  24} 
          color={grey[500]} 
          fontWeight={'bold'}
          py={rankIsLong ? 2 : 1}
          px={1}
          border={4}
          borderRadius={4}
          borderColor={grey[100]}
          bgcolor={'white'}
        >
          {rank || '-'}
        </Typography>
    )}
      onClick={() => navigate('projEditV2', { projId })}
      {...otherProps}
    />);
};