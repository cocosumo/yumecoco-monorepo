import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Grid, Slide } from '@mui/material';
import { grey } from '@mui/material/colors';

export const GridNextDivider = ({
  isShow = false,
} : {
  isShow?: boolean
}) => (
  <Slide direction="down" in={isShow}
    timeout={1000}
    mountOnEnter
    unmountOnExit
  >
    <Grid container item xs={12}
      justifyContent="center"
      fontSize={64}
      color={grey[600]}
    >
      <NavigateNextIcon
        sx={{ transform: 'rotate(90deg)' }}
        fontSize={'inherit'}
      />
    </Grid>
  </Slide>
);