import { Avatar, Chip, ChipProps, Tooltip } from '@mui/material';
import { AndpadLogo } from 'kokoas-client/src/components/ui/icons';

export const AndpadChip = ({
  systemId,
  tooltipTitle,
  color,
  onDelete,
}:{
  systemId: string | number,
  tooltipTitle?: string,
  color?: ChipProps['color'],
  onDelete?: () => void,
}) => (
  <Tooltip title={tooltipTitle}>
    <Chip
      color={color}
      avatar={(
        <Avatar
          sx={{
            bgcolor: 'red',
          }}
        >
          <AndpadLogo />
        </Avatar>)}
      size='small'
      label={systemId}
      onClick={() => {
        window.open(`https://andpad.jp/my/orders/${systemId}`, '_blank');
      }}
      onDelete={onDelete}
    />
  </Tooltip>
);