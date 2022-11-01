import {  BoxProps } from '@mui/material';
import { ColoredContainer } from './ColoredContainer';


export const GrayBox = (props: BoxProps) => {
  const {
    children,
    bgcolor = '#f5f5f5',
    ...others
  } = props;
  return (
    <ColoredContainer
      {...others}
      bgcolor={bgcolor}
    >
      {children}
    </ColoredContainer>
  );
};

export default GrayBox;