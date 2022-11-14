import { Avatar, ListItemAvatar } from '@mui/material';
import { MemoType } from './memoForm/MemoForm';
import { MemoIcon } from './memoForm/parts/MemoIcon';

export const MemoAvatar = ({
  memoType,
}: {
  memoType: MemoType
}) => {
  return (
    <ListItemAvatar>
      <Avatar src="#" >
        <MemoIcon type={memoType} />
      </Avatar>
    </ListItemAvatar>
  );
};