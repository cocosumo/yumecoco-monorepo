import { Alert, Box, Button, CircularProgress, Tooltip, Zoom, styled } from '@mui/material';
import { useTypedWatch } from '../../hooks';
import { useDebounceValue } from 'usehooks-ts';
import { usePostalByAddress } from 'kokoas-client/src/hooksQuery';
import { TForm } from '../../schema';
import { postalBuilder } from 'libs';
import MapIcon from '@mui/icons-material/Map';

const CustomAlert = styled(Alert)({
  position: 'absolute',
  top: 0,
  left: 0,
  whiteSpace: 'nowrap',
});

export const AddressCheck = () => {
  const [
    address1,
    address2,
  ] = useTypedWatch({
    name: [
      'address1',
      'address2',
    ],
  }) as [
    TForm['address1'],
    TForm['address2'],
  ];


  const combinedAddress = `${address1}${address2}`;
  const debouncedAddress = useDebounceValue(combinedAddress, 1000);

  const { data: postalId, isFetching } = usePostalByAddress(combinedAddress);

  const shouldShow = !!debouncedAddress && !isFetching && !!address1;

  return (
    <Box
      position={'relative'}
    >
      {isFetching &&  <CircularProgress size={24} />}
    
      <Zoom in={shouldShow && !!postalId}>
        <CustomAlert
          action={
            <Tooltip title="別タブでGoogleマップで開く">
              <Button 
                startIcon={<MapIcon />}
                color="inherit" 
                size="small"
                onClick={() => {
                  window.open(`https://www.google.com/maps/place/${postalId}`, '_blank');
              
                }}
              >
                地図
              </Button>
            </Tooltip>
            }
        >
          {`郵便番号が見つかりました。 ${postalBuilder(postalId)}`}
        </CustomAlert>
      </Zoom>

      <Zoom in={shouldShow && !postalId}>
        <CustomAlert 
          severity='warning' 
        >
          {'入力した住所から郵便番号が見つかりませんでした。住所を確認してください。'}
        </CustomAlert>
      </Zoom>
      
      
    </Box>);
};