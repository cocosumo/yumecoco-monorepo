import { createContext, ReactNode, useCallback, useMemo, useState } from 'react';
import { ConfirmDialogV2 } from './ConfirmDialogV2';
import { AlertProps } from '@mui/material';

export interface IDialogState {
  open?: boolean,
  title: ReactNode,
  content?: ReactNode,
  yesText?: string,
  noText?:string,
  withYes?: boolean,
  withNo?: boolean,
  handleYes?: () => void,
  handleNo?: () => void,
  willCloseOnYes?: boolean
  cancellable?: boolean
  severity?: AlertProps['severity']
}

const initialState: IDialogState = {
  open: false,
  title: '確認',
  content: '',
  willCloseOnYes: true,
};

export type HandleDialogStateFN = (params: IDialogState) => void;

export interface IConfirmDialogContext {
  setDialogState: HandleDialogStateFN
  handleClose : () => void
}



export const ConfirmDialogContext = createContext<undefined | IConfirmDialogContext>(undefined);

export const GlobalConfirmDialog = ({ children } : {
  children: ReactNode
}) => {
  const [state, setState] = useState<IDialogState>(initialState);

  const handleClose = useCallback(() => setState(
    prev => ({ ...prev, open: false, willCloseOnYes: true }),
  ), []);

  const handleState : HandleDialogStateFN = useCallback((params) => setState({
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

  }), [handleClose]);

  const provider = useMemo(() => {
    return {
      setDialogState: handleState,
      handleClose: handleClose,
    };
  }, [handleState, handleClose]);






  return (
    <ConfirmDialogContext.Provider value={provider}>

      {children}
      <ConfirmDialogV2 {...state} />
    </ConfirmDialogContext.Provider>);
};