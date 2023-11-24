import { Stack } from '@mui/material';
import { FiscalYearResult } from './fiscalYearResult/FiscalYearResult';
import { FiscalYearResultToltal } from './fiscalYearResult/FiscalYearResultToltal';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { useContractsByFiscalYear } from '../../hooks/useContractsByFiscalYear';
import { FiscalMonths } from './fiscalMonths/FiscalMonths';
import styles from './ResultPerStore.module.css';

export const ResultPerStore = ({
  storeId,
}:{
  storeId: string
}) => {

  const [
    year,
  ] = useTypedWatch({
    name: [
      'year',
    ],
  }) as [
    string,
    string,
  ];

  const fiscalYearQueryByStore = useContractsByFiscalYear({
    year,
    storeId,
  });

  const isJishaBukken = storeId === '自社物件';


  
  return (
    <Stack 
      className={styles.storeResult}
      spacing={2}
    >
      <FiscalYearResult fiscalYearQuery={fiscalYearQueryByStore} 
        hasTitle 
        storeId={storeId}
      />
      <FiscalMonths fiscalYearQuery={fiscalYearQueryByStore} />
      {isJishaBukken && <FiscalYearResultToltal />}
    </Stack>
  );
};

// 2023年度 全店舗 契約累積表
