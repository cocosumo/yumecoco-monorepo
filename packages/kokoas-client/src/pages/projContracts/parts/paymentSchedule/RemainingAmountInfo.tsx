import { Alert, AlertColor, Fade } from '@mui/material';
import { useField } from 'formik';
import { useRef, useState } from 'react';
import { useLazyEffect } from '../../../../hooks';
import { getFieldName, TypeOfForm } from '../../form';

export const RemainingAmountInfo = ({
  disabled = false,
}: {
  disabled?: boolean
}) => {

  const [field, meta, helpers] = useField<TypeOfForm['remainingAmt']>(getFieldName('remainingAmt'));
  const { value: remainingAmt, name } = field;
  const { error } = meta;
  const { setValue } = helpers;

  const [animAmt, setAnimAmt] = useState(remainingAmt || 0);

  const oldAmt = useRef(remainingAmt || 0);


  useLazyEffect(() => {
    if (remainingAmt === undefined) return;

    const oldDiff = remainingAmt - oldAmt.current;
    const interval = 10;
    const timeout = 800;
    const numOfCalls = timeout / interval;

    const increment = oldDiff / numOfCalls;


    let c = 0;
    const intervalId = setInterval(() => {
      setAnimAmt(prev => prev + increment);

      if (c++ === numOfCalls || remainingAmt === 0) {
        clearInterval(intervalId);
        setAnimAmt(remainingAmt);
        setValue(remainingAmt, true);
        oldAmt.current = remainingAmt;
      }

    }, interval);

    return () => clearInterval(intervalId);
  }, [remainingAmt], 800);


  const newNum = Math.round(animAmt);
  const isNumber = !isNaN(newNum);

  let severityOpt: AlertColor = 'warning';
  if (disabled) {
    severityOpt = 'info';
  } else if (!error) {
    severityOpt = 'success';
  }


  return (

    <Fade in={remainingAmt !== undefined} timeout={2000}>
      <Alert id={name} severity={severityOpt} >

        {disabled && '契約済みのため、編集不可です'}

        {!disabled && !error && '契約合計と請求額が合っています。'}

        {!disabled && !!error && `${error}`}

        {!disabled && !!error && isNumber && (
          <div>
            {`相違額： ${newNum?.toLocaleString()} 円 。`}
          </div>)}

      </Alert>
    </Fade>

  );
};