import { Alert, AlertTitle, Stack } from '@mui/material';
import { Actions } from './actions/Actions';

export const OrderDetails = ({
  projId,
}:{
  projId: string
}) => {

  return (
    <Stack
      spacing={2}
      p={2}
      
    >
      <Actions projId={projId} />
      <Alert severity='warning'>
        <AlertTitle>
          お知らせ
        </AlertTitle>
        申し訳ございません。このページは現在開発中です。発注はAndpadで行ってください。ご提案は大歓迎です。
      </Alert>
    </Stack>
  );
};