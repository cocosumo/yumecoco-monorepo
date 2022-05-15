
import { createContext, ReactNode, useState } from 'react';
import { FormSnack, SnackState } from './FormSnack';


export interface ISnackBarProvider {
  snackState: SnackState,
  setSnackState: (value?: SnackState) => void
}

const initialState : ISnackBarProvider = {
  snackState: { 
    open: false,
  },
  setSnackState: ()=>{return;},
};

/* 
const FormSnack = ({ snackState, handleClose }: { 
  snackState: SnackState,
  handleClose: ()=>void
}) => {

  const { open, message, severity }  = snackState;

  return (
    <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    open={open}
    autoHideDuration={2000}
    onClose={handleClose}
    sx={{ zIndex: 5001 }}
  >
      <Alert variant='filled' onClose={handleClose} severity={severity} sx={{ width: '100%' }} >
        {message}
      </Alert>

    </Snackbar>
  );
}; */


export const SnackBarContext = createContext<ISnackBarProvider>(initialState);

export const GlobalSnackBar = ({ 
  children, 
}: {
  children: ReactNode
}) =>{
  const [state, setState] = useState<SnackState>({
    open: false,
  });

  const handleClose = () => {
    if (state.handleClose) state.handleClose();
    setState(prev => ({ ...prev, open: false, handleClose: undefined }));
  };

  

  const provider = {
    snackState: state,
    setSnackState: (value: SnackState) => setState({ 
      ...state, 
      ...value,
    }),
  };


  return (
    <SnackBarContext.Provider value={provider}>
      {children}
      <FormSnack snackState={state} handleClose={handleClose}/>
    </SnackBarContext.Provider>
  );
}; 

