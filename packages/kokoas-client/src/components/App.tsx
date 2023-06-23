import { Overlay } from './ui/containers/Overlay';
import MainScreen from './MainScreen';
import { HashRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect } from 'react';
import { removeCSSFile } from 'libs/src/removeCSSFile';

export default function App() {

  useEffect(() => {
    removeCSSFile('argo.css'); // remove kintone's css file
  });

  return (

    <HashRouter>
      <CssBaseline />
      <Overlay>

        <MainScreen />

      </Overlay>
    </HashRouter>


  );
}