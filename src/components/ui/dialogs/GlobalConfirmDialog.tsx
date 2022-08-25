import { createContext, ReactNode, useState } from 'react';
import { ConfirmDialogV2 } from './ConfirmDialogV2';

export interface IDialogState {
  open?: boolean,
  title: ReactNode,
  content: ReactNode,
  yesText?: string,
  noText?:string,
  withYes?: boolean,
  withNo?: boolean,
  handleYes?: () => void,
  handleNo?: () => void,
  willCloseOnYes?: boolean
  cancellable?: boolean
}

const initialState: IDialogState = {
  open: false,
  title: '確認',
  content: '',
  willCloseOnYes: true,
};

export type HandleDialogStateFN = (params: IDialogState) => void;

interface IConfirmDialogContext {
  dialogState: IDialogState,
  setDialogState: HandleDialogStateFN
  handleClose : () => void
}



export const ConfirmDialogContext = createContext<undefined | IConfirmDialogContext>(undefined);

export const GlobalConfirmDialog = ({ children } : {
  children: ReactNode
}) => {
  const [state, setState] = useState<IDialogState>(initialState);

  const handleClose = () => setState(prev => ({ ...prev, open: false, willCloseOnYes: true }));

  const handleState : HandleDialogStateFN = (params) => setState({
    ...params,
    handleYes: () => {
      if (params.handleYes) {
        params.handleYes();
      }
      if (params.willCloseOnYes || typeof params.willCloseOnYes === 'undefined') {
        handleClose();
      }

    },
    handleNo: () => {
      if (params.handleNo) params.handleNo();

      handleClose();

    },

  });



  return (
    <ConfirmDialogContext.Provider value={{
      dialogState: state,
      setDialogState: handleState,
      handleClose: handleClose,
    }}>

      {children}
      <ConfirmDialogV2 {...state} />
    </ConfirmDialogContext.Provider>);
};