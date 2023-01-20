import { Box, SpeedDial, SpeedDialAction, Tooltip } from '@mui/material';
import { RiFileExcel2Fill } from '@react-icons/all-files/ri/RiFileExcel2Fill';
import { TiExport } from '@react-icons/all-files/ti/TiExport';
import { FaFileCsv } from '@react-icons/all-files/fa/FaFileCsv';
import PrintIcon from '@mui/icons-material/Print';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { AndpadLogo } from 'kokoas-client/src/components/ui/icons/Andpad';




export const ExportMenu = () => {
  const { setSnackState } = useSnackBar();

  const handleClick = () => {
    setSnackState({
      open: true,
      message: '申し訳ございません。機能は開発中です。',
      severity: 'warning',
    });
  };

  return (
    <Tooltip title={'出力'} placement={'top'}>
      <Box>
        <SpeedDial
          ariaLabel='出力'
          icon={<SpeedDialIcon icon={<TiExport fontSize={'22px'} />} />}
          direction={'down'}
          FabProps={{
            size: 'small',
          }}
        >
          <SpeedDialAction
            icon={<PrintIcon />}
            tooltipTitle={'印刷'}
            onClick={handleClick}
          />
          <SpeedDialAction
            icon={<RiFileExcel2Fill fontSize={'22px'} color={'green'} />}
            tooltipTitle={'エクセル'}
            onClick={handleClick}
          />

          <SpeedDialAction
            icon={<FaFileCsv fontSize={'22px'} color={'#C8102E'} />}
            tooltipTitle={'アンドパッド形式'}
            onClick={handleClick}
          />
          {/* 出力形式はここに追加。多くなったら、配列化してリファクタリングする。*/}
        </SpeedDial>
      </Box>
    </Tooltip>
  );
};