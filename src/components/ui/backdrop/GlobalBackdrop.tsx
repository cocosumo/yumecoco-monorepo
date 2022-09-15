import { createContext, ReactNode, useMemo, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';


export interface IBackdropState {
  open: boolean,
  content?: ReactNode
}


const initialState : IBackdropState = {
  open: false,
  content: <CircularProgress />,
};


export interface IBackdropContext {
  backdropState: IBackdropState,
  setBackdropState: (value: IBackdropState) => void
  handleClose : () => void
}

export const BackdropContext = createContext<undefined | IBackdropContext>(undefined);



export const GlobalBackdrop = ({ children }: {
  children: ReactNode,
} ) => {
  const [state, setState] = useState<IBackdropState>(initialState);

  const handleClose = () => setState({
    open: false,
  });

  const providerValue = useMemo(()=>({
    backdropState: state,
    setBackdropState: (params: IBackdropState) => {
      setState(prev => ({ ...prev, ...params }));
    },
    handleClose: handleClose,
  }), [setState, state]);


  return (
    <BackdropContext.Provider value={providerValue}>
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