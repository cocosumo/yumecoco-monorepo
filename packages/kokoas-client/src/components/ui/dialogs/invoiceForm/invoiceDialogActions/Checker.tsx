import { KProgress } from 'types/src/common/order';
import { useInvoiceStatus } from '../hooks/useInvoiceStatus';
import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const getChecker = (status: KProgress | '') => {
  switch (status) {
    case '未発注':
    case '支払済':
    case '発注済':
      return '';
    case '請求確認済':
      return '経理';
    case '請求承認済':
      return '本社';
    case '請求済':
    case '':
    default:
      return '担当者';
  }
};

export const Checker = () => {
  
  const {
    current,
  } = useInvoiceStatus();

  const checker = getChecker(current || '');

  return (
    <Typography color={grey[600]}>
      {checker && `${checker}がチェック`}
    </Typography>
  );
};