import { Button, ButtonProps } from '@mui/material';

import { useSubmitHandler } from '../../hooks/useSubmitHandler';


export const SubmitButton = ({
  onClick,
  ...others
}: ButtonProps) => {
  const handleSubmit = useSubmitHandler();

  return (
    <Button
      type='submit'
      variant={'contained'}
      onClick={(e) => handleSubmit({
        onValid: () => onClick?.(e),
      })}
      {...others}
    />
  );
};