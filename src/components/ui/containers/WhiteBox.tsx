import {  BoxProps } from '@mui/material';
import { ColoredContainer } from './ColoredContainer';


export const WhiteBox = (props: BoxProps) => {
  const {
    children,
    bgcolor = '#fff',
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

export default WhiteBox;