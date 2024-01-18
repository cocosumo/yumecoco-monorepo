import { Alert, Box, Button, CircularProgress, Tooltip, Zoom, styled } from '@mui/material';
import { useTypedWatch } from '../../hooks';
import { useDebounce } from 'usehooks-ts';
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
  const address1 = useTypedWatch({
    name: 'address1',
  }) as TForm['address1'];

  const debouncedAddress = useDebounce(address1, 1000);

  const { data: postalId, isLoading } = usePostalByAddress(debouncedAddress);

  const shouldShow = !!debouncedAddress && !isLoading;

  return (
    <Box
      position={'relative'}
    >
      {isLoading &&  <CircularProgress />}
    
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