import logo from '../../../assets/chatwork.svg';



export const ChatworkLogo = ({
  size = 16,
}:{
  /** pixels */
  size?: number,
}) => (
  <img src={logo} width={`${size}px`} />
);