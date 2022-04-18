import { createContext, useState } from 'react';
import { initialValues, MemoFormType } from './form';

export interface MemoItemProps {
  memoId: string,
  createDate: string,
  commenter: string,
  title: string,
  content: string,
  
}


export interface MemoContextValue {
  memoOpen: boolean,
  memoState?: MemoFormType,
  handleOpen: (params: Partial<MemoFormType>)=> void,
  handleClose: ( reason: 'backdropClick' | 'escapeKeyDown' | 'submitted', formState?: MemoItemProps ) => void,
}

export const MemoContext = createContext <MemoContextValue>({
  memoOpen: false,
  handleClose: ()=> {},
  handleOpen: () => {},
});

export const MemoContextProvider : React.FC = (props) => {
  const [memoOpen, setMemoOpen] = useState(false);
  const [memoState, setMemoState] = useState<MemoFormType>(initialValues);


  const handleOpen: MemoContextValue['handleOpen'] = (params) => {
    setMemoState(prev => ({ ...prev, ...params }));
    setMemoOpen(true);
  };
  const handleClose : MemoContextValue['handleClose'] = (reason) => {
    console.log(reason, memoOpen);
    setMemoOpen(false);
  };

  const contextValue = {
    memoOpen,
    memoState,
    handleOpen,
    handleClose,
  };

  return (
    <MemoContext.Provider value={contextValue}>
      {props.children}
    </MemoContext.Provider>
  );
};