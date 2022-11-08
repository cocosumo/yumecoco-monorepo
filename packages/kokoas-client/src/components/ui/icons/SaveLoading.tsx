import { Box, CircularProgress, Fab } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import { green } from '@mui/material/colors';


export const SaveLoading = ({
  success,
  loading,
}: {
  loading: boolean,
  success: boolean,
}) => {

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      <Fab
        aria-label="save"
        color="primary"
        sx={buttonSx}
      >
        {success ? <CheckIcon /> : <SaveIcon />}
      </Fab>
      {loading && (
      <CircularProgress
        size={68}
        sx={{
          color: green[500],
          position: 'absolute',
          top: -6,
          left: -6,
          zIndex: 1,
        }}
      />
      )}
    </Box>
  );
};