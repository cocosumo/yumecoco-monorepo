import { Stack } from '@mui/system';
import { Detail } from '../parts/Detail';
import { Box, Button } from '@mui/material';
import { grey } from '@mui/material/colors';

// 仮実装

export const CustomerDetails = () => {
  return (
    <Box 
      bgcolor='white'
      p={2}
      border={1}
      borderColor={grey[300]}
    >
      <Stack maxWidth={600} spacing={2}>
        <Detail label='店舗名' value='豊川中央店' />
        <Detail label='顧客名' value='山田太郎' />
        <Detail label='ここすも営業担当者' value='安富　直人、 大井　道晴' />
        <Detail label='現住所' value='〒4420873 愛知県豊川市山道町' />
        <Detail label='ゆめてつAG' value='高野 雅弘、 金指 悠太' />
      </Stack>
      <Button
        variant='outlined'
        sx={{ mt: 2 }}
      >
        顧客情報の詳細
      </Button>
    </Box>
  );
};