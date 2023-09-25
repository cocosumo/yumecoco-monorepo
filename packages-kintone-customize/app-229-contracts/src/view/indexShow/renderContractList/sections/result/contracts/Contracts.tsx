import { Box, LinearProgress } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { grey } from '@mui/material/colors';
import { useContractsResultGroupedByStore } from '../../../hooks/useContractResultGroupedByStore';

const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];



export const Contracts = () => {
  const { data, isLoading } = useContractsResultGroupedByStore();

  if (isLoading) return <LinearProgress />;

  console.log(data);

  return (
    <Box sx={{ minHeight: 393 }}>
      <Masonry columns={3} spacing={2}>
        {heights.map((height, index) => (
          <Box border={1} borderColor={grey[500]} key={`${index}${height}`}
            sx={{ height }}
          >
            {index + 1}
          </Box>
        ))}
      </Masonry>
    </Box>
  ); 
};