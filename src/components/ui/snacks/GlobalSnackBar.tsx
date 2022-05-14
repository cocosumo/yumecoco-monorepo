
import { createContext, ReactNode, useState } from 'react';
import { Alert, Snackbar, AlertColor } from '@mui/material';

export interface SnackState {
  open: boolean,
  severity?: AlertColor,
  message?: string,
  handleClose?: ()=>void
}


export interface ISnackBarProvider {
  value: SnackState,
  setValue: (value?: SnackState) => void
}

const initialState : ISnackBarProvider = {
  value: { 
    open: false,
  },
  setValue: ()=>{return;},
};


const FormSnack = ({ snackState }: { snackState: SnackState }) => {

  const { open, message, severity,  handleClose }  = snackState;

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
};


export const SnackBarContext = createContext<ISnackBarProvider>(initialState);

export const GlobalSnackBar = ({ 
  children, 
}: {
  children: ReactNode
}) =>{
  const [state, setState] = useState<SnackState>({
    open: false,
  });

  const handleClose = () => setState(prev => ({ ...prev, open: false }));
  

  const provider = {
    value: state,
    setValue: (value: SnackState) => setState({ 
      ...state, 
      handleClose: handleClose, 
      ...value }),
  };

  console.log(state);

  return (
    <SnackBarContext.Provider value={provider}>
      {children}
      <FormSnack snackState={state}/>
    </SnackBarContext.Provider>
  );
}; 

