import { RowLayout, RowLayoutProps } from './RowLayout';



export const ResultRow = (props: RowLayoutProps) => {
  const { 
    orderAmount, 
    paymentAmount,
  } = props;

  return (
    <RowLayout 
      {...props}
      orderAmount={orderAmount?.toLocaleString()}
      paymentAmount={paymentAmount?.toLocaleString()}
    />
  );
};