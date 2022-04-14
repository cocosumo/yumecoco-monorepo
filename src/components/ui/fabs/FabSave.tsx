
import { Fab, Grid, Zoom } from '@mui/material/';
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

    <Grid container justifyContent={'flex-end'} width={'100%'} left={0}  bottom={'24px'} position="fixed">
      <Zoom in={!url || pathname.includes(url)} timeout={1000}>
        <Fab
        variant='extended'
        onClick={onClick}
        size="large"
        aria-label="add"

        sx={{
          mr: 8,
          p: 4,
          zIndex: 3000,
        }}
        >
          <Save sx={{ mr: 1 }}/>
          保存
        </Fab>
      </Zoom>
    </Grid>


  );
};