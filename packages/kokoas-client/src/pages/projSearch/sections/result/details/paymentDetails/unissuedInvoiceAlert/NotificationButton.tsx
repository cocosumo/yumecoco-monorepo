import { Button, Tooltip } from '@mui/material';



export const NotificationButton = ({
  explanation,
  isDuplication,
  handleAlert,
}: {
  explanation: string
  isDuplication: boolean
  handleAlert: () => void
}) => (
  <Tooltip
    title={explanation}
    placement='top'
  >
    <span>
      <Button
        disabled={isDuplication}
        onClick={handleAlert}
        autoFocus
      >
        chatworkに送信
      </Button>
    </span>
  </Tooltip>
);
