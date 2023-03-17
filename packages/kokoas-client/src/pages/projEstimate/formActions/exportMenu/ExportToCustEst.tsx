import { SpeedDialAction, SpeedDialActionProps } from '@mui/material';
import { RiFileExcel2Fill } from '@react-icons/all-files/ri/RiFileExcel2Fill';
import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../form';
import { kokoasAPIBaseUrl } from 'kokoas-client/src/config/settings';
import { kokoasEndpoints } from 'libs';
import { useSnackBar } from 'kokoas-client/src/hooks';

/** 
 * 顧客が閲覧可能な情報をエクセル形式で出力するためのReactコンポーネントです。 
 * */
export const ExportToCustEst = forwardRef<HTMLElement, SpeedDialActionProps>((props, ref) => {
  const { setSnackState } = useSnackBar();
  const { getValues } = useFormContext<TypeOfForm>();

  const handleClick = () => {
    const estimateId = getValues('estimateId');
    const endpoint = `${kokoasAPIBaseUrl}/${kokoasEndpoints.downloadEstimateForCustomer}/${estimateId}`;
    setSnackState({
      open: true,
      severity: 'info',
      // 通じるかな？
      message: 'この機能はベータ版です。不具合の報告につきましては、管理者までご連絡いただけますようお願いいたします。', 
    });
    window.open(endpoint);
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