import { MenuItem, Stack, Typography } from '@mui/material';
import parseISO from 'date-fns/esm/parseISO';
import format from 'date-fns/format';
import { IProjects } from 'types';

export const ProspectItem = ({
  idx,
  handleClose,
  projName,
  schedContractPrice,
  schedContractDate,
  作成日時: createdAt,
  uuid: projId,
  cancelStatus,
}:IProjects & {
  idx: number,
  handleClose: () => void,
}) => {

  const handleClick = () => {
    const recordPath = `https://rdmuhwtt6gx7.cybozu.com/k/149/#/project/edit/v2?projId=${projId.value}`;

    window.open(recordPath, '_blank');
  };

  return (
    <MenuItem 
      onClick={() =>{
        handleClick();
        handleClose();
      }}
      divider
    >
      <Stack>
        <Stack
          direction={'row'}
          spacing={1}
          alignItems={'center'}
        >

          <Typography fontSize={12} color={'text.secondary'}>
            {idx + 1}
          </Typography>
          <Typography>
            {projName.value}
          </Typography>
        </Stack>
        <Stack
          direction={'row'}
          spacing={2}
          pl={3}
          alignItems={'center'}
        >
          <Typography fontSize={12}>
            契約予金額： 
            {(+schedContractPrice.value).toLocaleString()}
          </Typography>
          <Typography fontSize={12}>
            契約予定日：
            {schedContractDate.value ? format(parseISO(schedContractDate.value), 'yyyy-MM-dd') : '未定'}
          </Typography>
          <Typography fontSize={12}>
            作成日時：
            {format(parseISO(createdAt.value), 'yyyy-MM-dd')}
          </Typography>
          <Typography fontSize={12}>
            状態：
            {cancelStatus.value ? cancelStatus.value : '有効'}
          </Typography>

        </Stack>
      </Stack>
    </MenuItem>
  );
};