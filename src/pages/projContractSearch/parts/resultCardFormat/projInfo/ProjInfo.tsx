import { Box, FormHelperText, IconButton, Stack } from '@mui/material';
import { LabeledInfo } from '../../../../../components/ui/typographies';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const ProjInfo = () => {
  return (
    <Stack direction="row" spacing={2} justifyContent={'space-between'}>
      <LabeledInfo
        label='工事名'
        info={(
          <>
            {'田中淳　新築工事'}
            <FormHelperText sx={{ marginTop: -1 }}>
              74
            </FormHelperText>
          </>
          )}
        fontSize={20}
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