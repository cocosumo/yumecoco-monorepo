import { Button, Stack, Tooltip, ButtonProps } from '@mui/material';
import { Caption } from '../../../typographies';

export const TownButton = ({
  townReading,
  town,
  postalCode,
  handleClick,
  selected,
  ...buttonProps
}: ButtonProps & {
  townReading: string,
  town: string,
  postalCode: string
  selected: boolean,
  handleClick: (town: string) => void
}) => {

  const formattedPostalCode = `${postalCode.slice(0, 3)}-${postalCode.slice(3)}`;

  return (
    <Tooltip title={townReading}>
      <Button
        {...buttonProps}
        fullWidth
        onClick={() => handleClick(town)}
        color={selected ? 'primary' : 'secondary'}
        variant={selected ? 'contained' : 'outlined'}
      >
        <Stack>
          <div>
            {town}
          </div>
          <Caption text={formattedPostalCode} />
        </Stack>
      </Button>
    </Tooltip>);
};