import { createContext, useState } from 'react';
import { getMemoList } from './api/getMemoList';
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
  memoList?: MemoItemProps[]
  memoFormState?: MemoFormType,
  handleSetMemoState: (params: Partial<MemoFormType>)=> void,
  handleUpdateMemoList: (recordId: string) => void,
  handleOpen: (params: Partial<MemoFormType>)=> void,
  handleClose: ( reason: 'backdropClick' | 'escapeKeyDown' | 'submitted', formState?: MemoItemProps ) => void,
}



export const MemoContext = createContext <MemoContextValue | undefined>(undefined);



export const MemoContextProvider : React.FC = (props) => {

  const [memoOpen, setMemoOpen] = useState(false);
  const [memoFormState, setMemoFormState] = useState<MemoFormType>(initialValues);
  const [memoList, setMemoList] = useState<MemoItemProps[]>();

  const handleSetMemoState : MemoContextValue['handleSetMemoState'] = (params) => {
    setMemoFormState(prev => ({ ...prev, ...params }));
  };

  const handleOpen: MemoContextValue['handleOpen'] = (params) => {
    handleSetMemoState(params);
    setMemoOpen(true);
  };
  const handleClose : MemoContextValue['handleClose'] = (reason) => {
    if (reason === 'submitted'){
      getMemoList(memoFormState.recordId).then(resp => setMemoList(resp));
    }

    setMemoOpen(false);
  };

  const handleUpdateMemoList: MemoContextValue['handleUpdateMemoList'] = (recordId) => {
    getMemoList(recordId).then(res => setMemoList(res));
  };

  const contextValue: MemoContextValue = {
    memoOpen,
    memoFormState,
    memoList,
    handleOpen,
    handleSetMemoState,
    handleUpdateMemoList,
    handleClose,
  };

  return (
    <MemoContext.Provider value={contextValue}>
      {props.children}
    </MemoContext.Provider>
  );
};