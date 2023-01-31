import { Button, ButtonProps } from '@mui/material';
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
      )()}
      {...others}
    >
      検索
    </Button>
  );
};