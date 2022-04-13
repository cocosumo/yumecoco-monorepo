
import { Fab, Grid } from '@mui/material/';
import Save from '@mui/icons-material/Save';

interface Props {
  onClick?: ()=>void
}

export const FabSave = (props: Props) => {
  const {
    onClick,
  } = props;
  return (
    <Grid container justifyContent={'center'} width={'100%'} left={0} bottom={'24px'} position="fixed"> 
      <Fab
        variant='extended'
        onClick={onClick}
        size="large"
        aria-label="add"
    
        sx={{ 
          p: 4,
          zIndex: 3000, 
        }}
        >
        <Save sx={{ mr: 1 }}/>
        保存
      </Fab>
    </Grid>
  );
};