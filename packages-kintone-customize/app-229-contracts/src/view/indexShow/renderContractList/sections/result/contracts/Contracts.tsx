import { Box, LinearProgress } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { useContractsResultGroupedByStore } from '../../../hooks/useContractResultGroupedByStore';
import { useStores } from '../../../../../../hooks/useStores';
import { ByStoreTable } from './byStoreTable/ByStoreTable';




export const Contracts = () => {
  const { data, isLoading } = useContractsResultGroupedByStore();
  const { data: stores } = useStores();

  if (isLoading) return <LinearProgress />;

  console.log(data);

  return (
    <Box sx={{ minHeight: 393 }}>
      {!!stores && !!data && (
        <Masonry columns={3} spacing={2}>
          {stores.map(({
            店舗名: storeName,
            uuid: storeId,
          }) => (
            <ByStoreTable 
              key={storeId.value}
              storeName={storeName.value}
              rec={data[storeName.value] || []}
            />
          ))}
        </Masonry>

      ) }

    </Box>
  ); 
};