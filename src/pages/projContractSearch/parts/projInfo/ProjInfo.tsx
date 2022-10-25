import { Box, IconButton, Stack, Typography } from '@mui/material';
import { Caption, LabeledInfo } from '../../../../components/ui/typographies';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const ProjInfo = () => {
  return (
    <Stack direction="row" spacing={2} justifyContent={'space-between'}>
      <LabeledInfo label='工事名' info={
        <>
          <Typography fontWeight={'bold'} fontSize={20} >
            {'田中淳　新築工事'}
          </Typography>
          <Caption text='74' />
        </>
      }
      />
      <LabeledInfo label='店舗名' info='豊川店' />
      <LabeledInfo label='契約者' info='山川美香' />
      <LabeledInfo label='ゆめてつAG' info='山田太郎' />
      <LabeledInfo label='ここすも担当者' info='山田太郎' />
      <Box maxHeight={'100px'}>
        <IconButton >
          <MoreHorizIcon />
        </IconButton>
      </Box>

    </Stack>
  );
};