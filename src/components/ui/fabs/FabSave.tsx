
import { Fab, Box, Zoom, CircularProgress, Typography  } from '@mui/material/';
import Save from '@mui/icons-material/Save';
import { useLocation } from 'react-router-dom';
import { useIsFetching } from '@tanstack/react-query';


interface Props {
  onClick?: ()=>void,
  url?: string,
  loading?: boolean,
  appear?: boolean,
}

export const FabSave = (props: Props) => {
  const isFetching = useIsFetching();
  const { pathname } = useLocation();
  const {
    onClick,
    loading = false,
    appear = true,
    url,
  } = props;


  const isLoading = loading || !!isFetching;


  return (

    <Box sx={{ position: 'fixed', top: 72, right: 36, zIndex:  (theme) => theme.zIndex.snackbar - 2 }}>

      <Zoom in={(!url || pathname.includes(url)) && appear} timeout={500}>
        <Fab
          variant='extended'
          onClick={onClick}
          size="large"
          aria-label="add"
          disabled={isLoading}
          sx={{
            p: 4,
          }}
        >
          {isLoading && <CircularProgress size={25} />}
          {!isLoading && <Save />}

          <Typography ml={1}>
            保存
          </Typography>
        </Fab>
      </Zoom>

    </Box>


  );
};