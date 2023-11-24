import { Stack } from '@mui/material';

import style from './Results.module.css';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { useMemo } from 'react';
import { useStores } from '../../../../../hooks/useStores';
import { ResultPerStore } from './ResultPerStore';

export const Results = () => {
  const [
    selectedStoreId,
  ] = useTypedWatch({
    name: [
      'storeId',
    ],
  }) as [
    string,
  ];

  const { data: storeRec } = useStores();


  const storeIdsToDisplay = useMemo(() => {
    if (!storeRec) return null;

    if (!selectedStoreId) {
      const storeIds = storeRec.map((store) => store.uuid.value);
    
      return [
        ...storeIds,
        '自社物件', // K268 Not a store, but as per spec, it should be displayed both as a store option, and as a result
      ];
    }

    return [selectedStoreId];

  }, [selectedStoreId, storeRec]);


  console.log('storeIdsToDisplay', storeIdsToDisplay);
  

  return (
    <Stack 
      spacing={8} 
      id={'printNode'} 
      className={style.print}
      mx={1}
    >
      {storeIdsToDisplay?.map((storeId) => {
        return (
          <ResultPerStore 
            key={storeId}
            storeId={storeId}
          />
        );
      })}
    </Stack>
  );
};
