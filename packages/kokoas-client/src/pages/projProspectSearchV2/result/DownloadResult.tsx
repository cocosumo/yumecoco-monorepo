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
        顧客住所: d.custAddress,
        工事住所: d.projAddress,
        工事確定住所: d.projAddressConfirmed,
        夢てつAG: d.yumeAG,
        ここすも営業担当: d.cocoAG,
        ここすも工事担当: d.cocoConst,
        契約予定金額: d.schedContractAmt,
        不動産決済日: d.estatePurchaseDate,
        設計申込日: d.planApplicationDate,
        契約予定日: d.schedContractDate,
        リンク : `https://rdmuhwtt6gx7.cybozu.com/k/149/#/project/edit/v2?projId=${d.projId}`,
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