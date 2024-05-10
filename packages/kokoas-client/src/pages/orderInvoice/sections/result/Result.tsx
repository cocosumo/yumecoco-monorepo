import { SearchResult } from '../../types';
import { ResultTable } from './ResultTable';



const sampleData: Array<SearchResult> = [
  {
    invoiceId: 'uuidsampleadasdasdasd',
    invoiceStatus: '請求済',
    projName: '○○●●○○工事',
    storeName: '○○●●○○店舗',
    cocoAgName: '山田　太郎',
    supplierName: 'ABC株式会社',
    invoiceSystemNumber: 'T1234567890',
    orderAmount: 10000,
    paymentAmount: 10000,
    invoiceDate: '2026-01-01',
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
  },
];

export const Result = () => {

  
  
  return (
    <>

      <ResultTable data={sampleData} />
      {/* {!isLoading &&  <ResultTable data={data} />} */}
      {/* {isLoading && <LinearProgress />} */}
     
    
    </>
  );
};