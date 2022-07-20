import { createContext, ReactNode, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';
export interface IBackdropState {
  open: boolean,
  content?: ReactNode
}

const initialState: IBackdropState = {
  open: false,
  content: <CircularProgress/>,
};

interface IBackdropContext {
  backdropState: IBackdropState,
  setBackdropState: (param: IBackdropState) => void
  handleClose : () => void
}

export const BackdropContext = createContext<undefined | IBackdropContext>(undefined);


export const GlobalBackdrop = ({ children }: {
  children: ReactNode,
} ) => {
  const [state, setState] = useState<IBackdropState>(initialState);
  const handleState = (params: IBackdropState) => {
    setState(prev => ({ ...prev, ...params }));
  };
  const handleClose = () => setState(initialState);


  return (
    <BackdropContext.Provider value={{
      backdropState: state,
      setBackdropState: handleState,
      handleClose: handleClose,
    }}>
      {children}

      <Backdrop
        open={state.open}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.snackbar + 5000 }}
        >
        {state.content}
      </Backdrop>

    </BackdropContext.Provider>
  );
};
