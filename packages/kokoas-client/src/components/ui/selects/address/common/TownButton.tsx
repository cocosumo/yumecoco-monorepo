import { Button, Stack, Tooltip } from '@mui/material';
import { Caption } from '../../../typographies';

export const TownButton = ({
  townReading,
  town,
  postalCode,
  handleClick,
}: {
  townReading: string,
  town: string,
  postalCode: string
  handleClick: (town: string) => void
}) => {

  const formattedPostalCode = `${postalCode.slice(0, 3)}-${postalCode.slice(3)}`;

  return (
    <Tooltip title={townReading}>
      <Button
        fullWidth
        variant={'outlined'}
        onClick={() => handleClick(town)}
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