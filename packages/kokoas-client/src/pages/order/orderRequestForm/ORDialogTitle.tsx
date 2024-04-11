import { DialogTitle, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export const ORDialogTitle = ({
  storeName,
  projName,
}: {
  storeName: string,
  projName: string, }) => {
  return (
    <DialogTitle>
      <Typography fontSize={12} color={grey[600]} component={'span'}>
        {storeName}
      </Typography>
      <Typography ml={2} fontSize={'inherit'} component={'span'}>
        {projName}
      </Typography>
    </DialogTitle>
  );
};