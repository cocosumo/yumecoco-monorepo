import { Divider, Stack, Typography } from '@mui/material';
import { dateStrToJA } from '../../../../helpers/utils';

export const SelectMenu = ({
  dateCreated,
  contractPrice,
  id,
}: {
  dateCreated: string,
  contractPrice: string,
  id: string,
}) => {
  const contents = [
    ['作成日', dateStrToJA(dateCreated)],
    ['契約金額', `${contractPrice}円`],
    ['番号', id],
  ];
  return (
    <Stack width={'100%'} direction={'row'} spacing={2} alignItems="center" justifyContent="space-around" divider={<Divider orientation="vertical" flexItem />}>
      {
      contents.map(([label, info])=>{
        return (
          <Stack direction={'column'} key={label} width={'33%'}>
            <Typography variant="caption">{label}</Typography>
            <Typography variant="body1">{info}</Typography>
          </Stack>
        );
      })
      }

    </Stack>
  );
};