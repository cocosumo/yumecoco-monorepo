import Save from '@mui/icons-material/Save';
import { Box, Fab, Stack, Typography, Zoom } from '@mui/material';

export const FormActions = () => {

  return (
    <Box  sx={{ position: 'fixed', top: 72, right: 36, zIndex: 3000 }}>

      <Zoom in={true} timeout={500}>
        <Stack>
          <Fab
            variant='extended'
            size="medium"
            aria-label="add"
          >

            <Save/>
            <Typography ml={1}>保存</Typography>
          </Fab>
          <Fab
            variant='extended'
            //onClick={handleClick}
            size="medium"
            aria-label="add"
            //disabled={isLoading}
          >

            <Save/>
            <Typography ml={1}>保存</Typography>
          </Fab>

        </Stack>

      </Zoom>

    </Box>
  );
};