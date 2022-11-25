import { createContext, useMemo, useState } from 'react';
import { getMemoList } from './api/getMemoList';
import { initialValues, MemoFormType } from './form';



export interface MemoContextValue {
  memoOpen: boolean,
  memoList?: MemoFormType[]
  memoFormState?: MemoFormType,
  confirmSaveOpen: boolean,
  handleConfirmSaveOpen: (open: boolean) => void,
  handleSetMemoState: (params: Partial<MemoFormType>)=> void,
  handleUpdateMemoList: (recordId?: string) => void,
  handleOpen: (params: Partial<MemoFormType>)=> void,
  handleClose: ( reason: 'backdropClick' | 'escapeKeyDown' | 'submitted', formState?: MemoFormType ) => void,
}



export const MemoContext = createContext <MemoContextValue | undefined>(undefined);



export const MemoContextProvider = ({
  children,
} : {
  children: React.ReactNode
}) => {
  const [confirmSaveOpen, setConfirmSaveOpen] = useState<boolean>(false);
  const [memoOpen, setMemoOpen] = useState(false);
  const [memoFormState, setMemoFormState] = useState<MemoFormType>(initialValues);
  const [memoList, setMemoList] = useState<MemoFormType[]>();

  const handleConfirmSaveOpen = (open: boolean) =>{
    setConfirmSaveOpen(open);
  };

  const handleSetMemoState : MemoContextValue['handleSetMemoState'] = (params) => {
    setMemoFormState(prev => ({ ...prev, ...params }));
  };

  const handleOpen: MemoContextValue['handleOpen'] = (params) => {
    handleSetMemoState(params);
    setMemoOpen(true);
  };

  const handleUpdateMemoList: MemoContextValue['handleUpdateMemoList'] = (recordId = memoFormState.custGroupId) => {
    getMemoList(recordId).then(res => setMemoList(res));
  };

  /* Close MemoFormDialog */
  const handleClose : MemoContextValue['handleClose'] = (reason) => {
    if (reason === 'submitted') {
      setConfirmSaveOpen(false);
      handleUpdateMemoList(memoFormState.custGroupId);
    }
    setMemoFormState(initialValues);
    setMemoOpen(false);
  };

  const contextValue: MemoContextValue = useMemo(()=> ({
    memoOpen,
    memoFormState,
    memoList,
    confirmSaveOpen,
    handleConfirmSaveOpen,
    handleOpen,
    handleSetMemoState,
    handleUpdateMemoList,
    handleClose,
  }),
  // Todo: fix deps, when converted to react-query
  [memoOpen, memoFormState, memoList, confirmSaveOpen],
  );

  return (
    <MemoContext.Provider value={contextValue}>
      {children}
    </MemoContext.Provider>
  );
};