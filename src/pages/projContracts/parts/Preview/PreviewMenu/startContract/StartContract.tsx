import SendIcon from '@mui/icons-material/Send';
import {  ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { useStartContractProcess } from '../../../../hooks/useStartContractProcess';

export const StartContract = ()=>{

  const {
    handleClickStart,
  } = useStartContractProcess();


  return (
    <MenuItem
      onClick={handleClickStart}
    >
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText>
        契約を作成する
      </ListItemText>
    </MenuItem>


  );
};