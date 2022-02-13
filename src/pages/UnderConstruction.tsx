
import Construction from './../../src/assets/construction.jpg';
import { Box } from '@mui/material';


export default function UnderConstruction() {
  return (


    <Box width="100%" height="80vh">
      <img
        width="50%"
        style={{
          'margin': '0 auto 0 auto',
          'display': 'block',
        }}
        src={Construction}
        alt="construction"
      />

    </Box>

  );
}