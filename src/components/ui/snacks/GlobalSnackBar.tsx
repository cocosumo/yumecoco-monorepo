
import { createContext, Dispatch, ReactNode, useMemo, useState } from 'react';
import { FormSnack, SnackState } from './FormSnack';


export interface ISnackBarProvider {
  snackState: SnackState,
  setSnackState: Dispatch<React.SetStateAction<SnackState>>
}

const initialState : ISnackBarProvider = {
  snackState: {
    open: false,
  },
  setSnackState: ()=>{return;},
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

  const handleClose = () => {
    if (state.handleClose) state.handleClose();
    setState(prev => ({ ...prev, open: false, handleClose: undefined }));
  };


  const provider = useMemo(() => ({
    snackState: state,
    setSnackState: setState,
  }), [state]);


  return (
    <SnackBarContext.Provider value={provider}>
      {children}
      <FormSnack snackState={state} handleClose={handleClose} />
    </SnackBarContext.Provider>
  );
};

