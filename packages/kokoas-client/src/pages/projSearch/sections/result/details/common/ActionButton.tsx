import { Button, ButtonProps, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

export interface ActionButtonProps {
  href?: string,
  title?: string
}

export interface ActionButtonBaseProps extends ActionButtonProps {
  startIcon?: ReactNode
  children?: ReactNode
  color?: ButtonProps['color']
  target?: string
}



export const ActionButton = ({
  href,
  title,
  startIcon,
  children,
  color,
  target,
} : ActionButtonBaseProps) => {
  return (
    <Tooltip 
      title={title}
      placement='top'
    >
      <Link 
        to={href || ''}
        style={{
          alignSelf: 'flex-end',
        }}
        target={target}
      >
        <Button 
          startIcon={startIcon}
          variant='outlined'
          size='small'
          disabled={!href}
          color={color}
        >
          {children}
        </Button>
      </Link>
    </Tooltip>

  );
};