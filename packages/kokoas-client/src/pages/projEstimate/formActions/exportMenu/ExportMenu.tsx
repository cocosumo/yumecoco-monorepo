import { Box, SpeedDial, SpeedDialAction, Tooltip } from '@mui/material';
import { TiExport } from '@react-icons/all-files/ti/TiExport';
import PrintIcon from '@mui/icons-material/Print';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { ExportToAndpad } from './ExportToAndpad';
import { ExportToCustEst } from './ExportToCustEst';

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
          icon={<SpeedDialIcon icon={<TiExport size={22} />} />}
          direction={'down'}
          FabProps={{
            size: 'small',
          }}
        >
          <ExportToAndpad />
          <ExportToCustEst />
          <SpeedDialAction
            icon={<PrintIcon />}
            tooltipTitle={'印刷'}
            onClick={handleClick}
          />
          {/* 出力形式はここに追加。多くなったら、配列化してリファクタリングする。*/}
        </SpeedDial>
      </Box>
    </Tooltip>
  );
};