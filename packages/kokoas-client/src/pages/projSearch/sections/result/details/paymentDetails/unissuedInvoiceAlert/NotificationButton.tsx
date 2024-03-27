import { Button, Tooltip } from '@mui/material';



export const NotificationButton = ({
  explanation,
  handleAlert,
}: {
  explanation: string
  handleAlert: () => void
}) => (
  <Tooltip
    title={explanation}
    placement='top'
  >
    <span>
      <Button
        onClick={handleAlert}
        autoFocus
      >
        chatworkに送信
      </Button>
    </span>
  </Tooltip>
);
