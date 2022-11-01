import { createContext, ReactNode, useCallback, useMemo, useState } from 'react';
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

  const handleSetBackdropState = useCallback(
    (params: IBackdropState) => {
      setState(prev => ({ ...prev, ...params }));
    }, []);

  const providerValue = useMemo(()=>({
    backdropState: state,
    setBackdropState: handleSetBackdropState,
    handleClose: handleClose,
  }), [ state, handleSetBackdropState]);


  return (
    <BackdropContext.Provider value={providerValue}>
      {children}
      <Backdrop
        open={state.open}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.snackbar - 1 }}
      >
        {state.content}
      </Backdrop>

    </BackdropContext.Provider>
  );
};
