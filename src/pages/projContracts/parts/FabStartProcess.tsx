
import { Fab, Box, Zoom, CircularProgress, Typography  } from '@mui/material/';
import StartIcon from '@mui/icons-material/Start';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';


interface Props {
  onClick?: ()=>void,
  url?: string,
  loading?: boolean,
  appear?: boolean,
}

export const FabStartProcess = (props: Props) => {
  const { pathname } = useLocation();
  const {
    onClick,
    loading = false,
    appear = true,
    url,
  } = props;

  const [throttle, setThrottle] = useState(false);

  const handleClick = () => {
    if (!onClick) return;

    setThrottle(true);
    setTimeout(()=>{
      onClick();
      setThrottle(false);
    }, 1500);
  };

  const isLoading = loading || throttle;


  return (

    <Box  sx={{ position: 'fixed', top: 142, right: 36, zIndex: 3000 }}>

      <Zoom in={(!url || pathname.includes(url)) && appear} timeout={500}>
        <Fab
        variant='extended'
        onClick={handleClick}
        size="small"
        disabled={isLoading}
        sx={{ p: 2 }}
        >
          <Typography mr={1}>契約手続き開始</Typography>
          {isLoading && <CircularProgress size={25}/>}
          {!isLoading && <StartIcon/>}

        </Fab>
      </Zoom>

    </Box>


  );
};