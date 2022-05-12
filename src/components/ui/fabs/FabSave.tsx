
import { Fab, Box, Zoom } from '@mui/material/';
import Save from '@mui/icons-material/Save';
import { useLocation } from 'react-router-dom';

interface Props {
  onClick?: ()=>void,
  url?: string
}

export const FabSave = (props: Props) => {
  const { pathname } = useLocation();
  const {
    onClick,
    url,
  } = props;
  return (

    <Box  sx={{ position: 'fixed', top: 72, right: 36, zIndex: 3000 }}>
      <Zoom in={!url || pathname.includes(url)} timeout={1000}>
        <Fab
        variant='extended'
        onClick={onClick}
        size="large"
        aria-label="add"

        sx={{
          p: 4,
        }}
        >
          <Save sx={{ mr: 1 }}/>
          保存
        </Fab>
      </Zoom>
    </Box>


  );
};