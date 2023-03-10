import { ListItemIcon, MenuItem, MenuItemProps, Tooltip } from '@mui/material';
import { ReactNode } from 'react';

export const MenuItemWithIcon = ({
  label,
  icon,
  tooltipTitle,
  ...others
}: MenuItemProps & {
  label: string,
  icon: ReactNode,
  tooltipTitle?: ReactNode
}) => {
  return (
    <Tooltip 
      title={tooltipTitle} 
      placement='left'
    >
      <MenuItem disableRipple {...others}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        {label}
      </MenuItem>
    </Tooltip>
  );
};