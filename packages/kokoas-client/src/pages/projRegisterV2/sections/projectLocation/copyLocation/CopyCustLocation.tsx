import { Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useCustomersByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { useTypedFormContext, useTypedWatch } from '../../../hooks/useTypedRHF';
import { LoadingButton } from '@mui/lab';

export const CopyCustLocation = () => {
  const { setValue } = useTypedFormContext();
  const [
    custGroupId,
  ] = useTypedWatch({
    name: [
      'custGroupId',
      'hasContract',
    ],
  });
  const { data, isLoading } = useCustomersByCustGroupId(custGroupId as string);
  const {
    postalCode,
    address1,
    address2,
  } = data?.[0] || {};

  return (
    <Tooltip 
      title="顧客の現住所をコピーする"
      placement='top'
    >
      <span>
        <LoadingButton 
          variant='outlined'
          color='primary' 
          startIcon={<ContentCopyIcon />} 
          loading={isLoading}
          disabled={!data}
          onClick={() => {
            setValue('postal', postalCode?.value || '');
            setValue('address1', address1?.value || '');
            setValue('address2', address2?.value || '');
          }}
        >
          顧客の現住所
        </LoadingButton>
      </span>
    </Tooltip>
  );
};