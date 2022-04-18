
import { Menu, MenuItem } from '@mui/material';
import { MemoFormType } from './memoForm/form';

export interface MenuProps {
  anchorEl: HTMLElement | null,
  handleClose: (
    e?: React.MouseEvent<HTMLLIElement>, 
    memoItem?: MemoFormType,
    method?: '削除' | '編集'
  )=>void
  memoItem: MemoFormType,
}

export const MemoItemMenu = (props: MenuProps) => {
  const {
    memoItem,
    anchorEl,
    handleClose,
  } = props;

  const open = Boolean(anchorEl);

  

  return (
    <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={()=> handleClose()}
      >
      <MenuItem onClick={(e) =>handleClose(e, memoItem, '編集')}>編集</MenuItem>
      <MenuItem onClick={(e) => handleClose(e, memoItem, '削除')}>削除</MenuItem>
    </Menu>
  );
};
