import { Button, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { SearchResult } from '../../types';
import { mkConfig, generateCsv, download } from 'export-to-csv';




/**
 * 依頼：K226
 * 
 */
export const DownloadResult = ({
  data,
}:{
  data: SearchResult[] 
}) => {

  const handleDownload = () => {
    const csvConfig = mkConfig({ 
      useKeysAsHeaders: true, 
      filename: `顧客一覧_${data.length}件`,
    });
    const convertedData: Record<string, string>[] = data.map((d) => {
      return ({
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
        契約日: d.contractDate,
        引渡日:d.deliveryDate,
        物件完了日: d.projFinDate,
        リンク : `https://rdmuhwtt6gx7.cybozu.com/k/149/#/project/edit/v2?projId=${d.uuid}`,
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