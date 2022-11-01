import { Overlay } from './ui/containers/Overlay';
import MainScreen from './MainScreen';
import { HashRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

export default function App() {
  return (

    <HashRouter>
      <CssBaseline />
      <Overlay>

        <MainScreen />

      </Overlay>
    </HashRouter>


  );
}