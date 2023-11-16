import { Button, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { ISearchResult } from '../types';

/**
 * K227
 * 
 */
export const DownloadResult = ({
  data,
}:{
  data: ISearchResult[]
}) => {
 
  const handleDownload = () => {
    const csvConfig = mkConfig({ 
      useKeysAsHeaders: true, 
      filename: `見込み一覧_${data.length}件`,
    });
    const convertedData: Record<string, string | number>[] = data.map((d) => {
      return ({
        ランク: d.rank,
        店舗名: d.storeName,
        '顧客名（連名）': d.custNames,
        電話番号: d.tel,
        工事名: d.projName,
        顧客郵便番号: d.custPostalCode,
        顧客住所: d.custAddress,

        // K246 工事確定住所が入力されている工事は、工事確定住所を工事住所として表示してほしい
        工事郵便番号: d.projPostalCodeConfirmed ? d.projPostalCodeConfirmed :  d.projPostalCode,
        工事住所: d.projAddressConfirmed || d.projAddress,
        
        
        夢てつAG: d.yumeAG,
        ここすも営業担当: d.cocoAG,
        ここすも工事担当: d.cocoConst,
        契約予定金額: d.schedContractAmt,
        不動産決済日: d.estatePurchaseDate,
        設計申込日: d.planApplicationDate,
        契約予定日: d.schedContractDate,
      });
    });

    const csv = generateCsv(csvConfig)(convertedData);


    download(csvConfig)(csv);
    
  };

  return (
    <Tooltip title='検索結果をCSV型でダウンロードします'>
      <Button
        startIcon={<DownloadIcon />}
        variant='outlined'
        color='secondary'
        onClick={handleDownload}
      >
        ダウンロード
      </Button>
    </Tooltip>
  );
};