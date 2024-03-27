import { Button, ButtonProps, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

export interface ActionButtonProps {
  href?: string,
  title?: string
  children?: ReactNode
  disabled?: boolean

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
  disabled,
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
          color={color}
          disabled={disabled}
        >
          {children}
        </Button>
      </Link>
    </Tooltip>

  );
};