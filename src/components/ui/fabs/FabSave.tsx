
import Fab from '@mui/material/Fab';
import Save from '@mui/icons-material/Save';

interface Props {
  onClick?: ()=>void
}

export const FabSave = (props: Props) => {
  const {
    onClick,
  } = props;
  return (
    <Fab
    onClick={onClick}
    color="primary"
    size="large"
    aria-label="add"
    sx={{ position: 'fixed', bottom: 16, right: 24, zIndex: 3000 }}
    >
      <Save />
    </Fab>
  );
};