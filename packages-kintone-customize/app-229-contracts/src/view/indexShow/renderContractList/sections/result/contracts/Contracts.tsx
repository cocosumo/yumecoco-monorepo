import { Box, LinearProgress } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { useContractsResultGroupedByStore } from '../../../hooks/useContractResultGroupedByStore';
import { useStores } from '../../../../../../hooks/useStores';
import { ByStoreTable } from './byStoreTable/ByStoreTable';




export const Contracts = () => {
  const { data, isLoading } = useContractsResultGroupedByStore();
  const { data: stores } = useStores();

  return (
    <Box>
      {isLoading && <LinearProgress />}
      {!isLoading && !!stores && !!data && (
        <Masonry 
          sx={{
            width: 2400,
            
          }}
          columns={3} spacing={2}
        >
          {stores.map(({
            店舗名: storeName,
            uuid: storeId,
          }) => (
            <ByStoreTable 
              key={storeId.value}
              storeName={storeName.value}
              records={data[storeName.value] || []}
            />
          ))}
        </Masonry>

      ) }

    </Box>
  ); 
};