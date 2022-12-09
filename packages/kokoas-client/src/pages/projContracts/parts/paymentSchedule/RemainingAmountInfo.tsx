import { Alert, AlertColor, Fade } from '@mui/material';
import { useField } from 'formik';
import { getFieldName, TypeOfForm } from '../../form';

export const RemainingAmountInfo = ({
  disabled = false,
}: {
  disabled?: boolean
}) => {

  const [field, meta] = useField<TypeOfForm['remainingAmt']>(getFieldName('remainingAmt'));
  const { value: remainingAmt, name } = field;
  const { error } = meta;

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

        {!disabled && !!error && (
          <div>
            {`相違額： ${remainingAmt?.toLocaleString()} 円 。`}
          </div>)}

      </Alert>
    </Fade>

  );
};