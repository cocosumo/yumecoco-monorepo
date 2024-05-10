import { RowLayout, RowLayoutProps } from './RowLayout';



export const ResultRow = (props: RowLayoutProps) => {
  const { 
    orderAmount, 
    paymentAmount,
  } = props;

  return (
    <RowLayout 
      {...props}
      orderAmount={`${orderAmount?.toLocaleString()}円`}
      paymentAmount={`${paymentAmount?.toLocaleString()}円`}
    />
  );
};