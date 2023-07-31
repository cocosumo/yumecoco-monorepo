import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ComponentProps, ReactNode } from 'react';
import { Link } from 'react-router-dom';

export const LinkListItemButton = ({
  icon,
  text,
  to = '/',
  indented = false,
  ...others
}: Omit<ComponentProps<typeof Link>, 'to'> & {
  icon: ReactNode
  text: ReactNode,
  to?: string,
  indented?: boolean
} ) => {
  return (
    <Link {...others} to={to} >
      <ListItemButton sx={{ pl: indented ? 4 : undefined }}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </Link>
  );
};