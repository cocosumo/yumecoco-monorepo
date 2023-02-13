import andpadRedLogo from '../../../assets/andpad.svg';
import andpadLogo from '../../../assets/andpadlogo.png';



export const AndpadLogo = ({
  size = 25,
  variant = 'white',
}:{
  /** pixels */
  size?: number,
  variant?: 'red' | 'white'
}) => (
  <img src={variant === 'red' ? andpadRedLogo : andpadLogo} width={`${size}px`} />
);