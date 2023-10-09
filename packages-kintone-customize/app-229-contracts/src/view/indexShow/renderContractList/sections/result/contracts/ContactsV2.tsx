import { useStores } from '../../../../../../hooks/useStores';
import { companyPropertyField, useContractsResultGroupedByStore } from '../../../hooks/useContractResultGroupedByStore';

import { Box, LinearProgress } from '@mui/material';
import { ByStoreTable } from './byStoreTable/ByStoreTable';
import styles from './ContactsV2.module.css';


export const ContactsV2 = () => {
  const { data, isLoading } = useContractsResultGroupedByStore();
  const { data: stores } = useStores();

  return (
    <>
      {isLoading && <LinearProgress />}
      {!isLoading && !!stores && !!data && (
        <Box 
          sx={{
            columnCount: 3,
            width: 2100,
          }}
          className={styles.contacts}
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
          <ByStoreTable 
            records={data[companyPropertyField] || []}
            storeName={companyPropertyField}

          />
        </Box>
      )}
        
    

    </>
  );
};