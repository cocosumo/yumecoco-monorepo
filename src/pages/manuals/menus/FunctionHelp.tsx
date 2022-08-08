import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

/**
 * 各機能のヘルプ
 * @returns 
 */
const FunctionHelp = () => {
  return (
    <>
      <ListItemButton /* onClick={handleClick} */>
        <ListItemIcon>
          {/* <ManageAccountsIcon /> */}
        </ListItemIcon>
        <ListItemText primary="顧客管理" />
        {/* open ? <ExpandLess /> : <ExpandMore /> */}
      </ListItemButton>
      <Collapse /* in={open} */ timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              {/* <AccountBalanceIcon /> */}
            </ListItemIcon>
            <ListItemText primary="資金計画作成" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              {/* <CurrencyYenIcon /> */}
            </ListItemIcon>
            <ListItemText primary="見積作成書" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              {/* <UpdateIcon /> */}
            </ListItemIcon>
            <ListItemText primary="見込管理" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};

export default FunctionHelp;