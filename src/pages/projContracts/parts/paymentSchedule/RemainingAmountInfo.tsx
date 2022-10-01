import { Alert } from '@mui/material';
import { useField } from 'formik';
import {  useRef, useState } from 'react';
import { useLazyEffect } from '../../../../hooks';
import { getFieldName, TypeOfForm } from '../../form';

export const RemainingAmountInfo = () => {
  const [field, meta] = useField<TypeOfForm['remainingAmt']>(getFieldName('remainingAmt'));

  const { value: remainingAmt } = field;
  const { error } = meta;

  const [animAmt, setAnimAmt] = useState(remainingAmt);

  const oldAmt = useRef(remainingAmt);
  

  useLazyEffect(()=>{
    const oldDiff = remainingAmt - oldAmt.current;
    const interval = 10;
    const timeout = 800;
    const numOfCalls = timeout / interval;

    const increment =  oldDiff / numOfCalls;
  

    let c = 0;
    const intervalId = setInterval(()=>{
      setAnimAmt(prev => prev + increment);

      if (c++ === numOfCalls || remainingAmt === 0) {
        clearInterval(intervalId);
        setAnimAmt(remainingAmt);
        oldAmt.current = remainingAmt;
      }
      
    }, interval);

    return () => clearInterval(intervalId);
  }, [remainingAmt], 800);

  const isValidTotal = remainingAmt === 0;

  return (
    <Alert severity={isValidTotal ? 'success' : 'warning'}>

      {!error && '契約合計と請求額が合っています。'}

      {!!error && ` ${error} 相違額： ${Math.round(animAmt)?.toLocaleString() || 0} 円 。 `}
          
    </Alert>

  );
};