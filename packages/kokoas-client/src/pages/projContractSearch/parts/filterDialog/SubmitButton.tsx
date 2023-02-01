import { Button, ButtonProps } from '@mui/material';
import { useSnackBar } from 'kokoas-client/src/hooks';
import qs from 'qs';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TypeOfForm } from '../../form';

function filterNonNull<T extends object>(obj: T) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v));
}

export const SubmitButton = ({
  onClick,
  ...others
}: ButtonProps) => {
  const navigate = useNavigate();
  const { handleSubmit } = useFormContext<TypeOfForm>();
  const { setSnackState } = useSnackBar();

  return (
    <Button
      type='submit'
      variant={'contained'}
      onClick={(e) => handleSubmit(
        (data) => {

          const query = qs.stringify(filterNonNull(data));
          navigate(`?${query}`);

          onClick?.(e);
        },
        (errors) => {
          const errorField = Object.values(errors)[0]; // Show first validation error instance

          setSnackState({
            open: true,
            message: `${errorField.message}`,
            severity: 'error',
          });
        },
      )()}
      {...others}
    />
  );
};