import { SpeedDialAction, SpeedDialActionProps } from '@mui/material';
import { RiFileExcel2Fill } from '@react-icons/all-files/ri/RiFileExcel2Fill';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { forwardRef } from 'react';

/** 
 * 顧客が閲覧可能な情報をエクセル形式で出力するためのReactコンポーネントです。 
 * */
export const ExportToCustEst = forwardRef<HTMLElement, SpeedDialActionProps>((props, ref) => {

  const { setSnackState } = useSnackBar();

  const handleClick = () => {
    setSnackState({
      open: true,
      message: '申し訳ございません。機能は開発中です。',
      severity: 'warning',
    });
  };

  return (
    <SpeedDialAction
      {...props}
      ref={ref}
      icon={<RiFileExcel2Fill size={22} color={'green'} />}
      tooltipTitle={'アンドパッド形式'}
      onClick={handleClick}
    />
  
  ); 
});

ExportToCustEst.displayName = 'ExportToCustEst';