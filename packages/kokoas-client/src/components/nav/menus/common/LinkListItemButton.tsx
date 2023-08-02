import styled from '@emotion/styled';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ComponentProps, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';


const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;


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

  // use current location
  const location = useLocation();
  return (
    <StyledLink 
      {...others} to={to}
    >
      <ListItemButton 
        selected={location.pathname.includes(to)}
        sx={{ 
          pl: indented ? 4 : undefined,         
        }}
      >
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </StyledLink>
  );
};