import { Collapse, FormHelperText, Typography } from '@mui/material';
import {  useRef, useState } from 'react';
import { useLazyEffect } from '../../../../hooks';

export const RemainingAmountInfo = ({
  remainingAmount,
}: {
  remainingAmount: number
}) => {
  const [animAmt, setAnimAmt] = useState(remainingAmount);

  const oldAmt = useRef(remainingAmount);
  

  useLazyEffect(()=>{
    const oldDiff = remainingAmount - oldAmt.current;
    const interval = 10;
    const timeout = 800;
    const numOfCalls = timeout / interval;

    const increment =  oldDiff / numOfCalls;
  

    let c = 0;
    const intervalId = setInterval(()=>{
      setAnimAmt(prev => prev + increment);

      if (c++ === numOfCalls || remainingAmount === 0) {
        clearInterval(intervalId);
        setAnimAmt(remainingAmount);
        oldAmt.current = remainingAmount;
      }
      
    }, interval);

    return () => clearInterval(intervalId);
  }, [remainingAmount], 800);

  return (
    <Collapse in={remainingAmount !== 0} unmountOnExit={false}>
 
      <FormHelperText error={true}>
        契約合計と請求額が相違しています。相違額：
        <Typography fontWeight={'bold'} component="span">
          {`${Math.round(animAmt)?.toLocaleString() || 0} 円 `}
         
        </Typography>
        。
      </FormHelperText>
    </Collapse>
  );
};