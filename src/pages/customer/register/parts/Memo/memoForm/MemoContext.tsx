import { createContext, useState } from 'react';

export interface MemoItemProps {
  id: string,
  createDate: string,
  commenter: string,
  title: string,
  content: string,
}


interface MemoContextValue {
  memoOpen: boolean,
  handleOpen: ()=> void,
  handleClose: ( reason: 'backdropClick' | 'escapeKeyDown', formState?: MemoItemProps ) => void,
}

export const MemoContext = createContext <MemoContextValue>({
  memoOpen: false,
  handleClose: ()=> {},
  handleOpen: () => {},
});

export const MemoContextProvider : React.FC = (props) => {
  const [memoOpen, setMemoOpen] = useState(false);

  const handleOpen = () => {
    console.log('openMemo');
    setMemoOpen(true);
  };
  const handleClose : MemoContextValue['handleClose'] = (reason) => {
    console.log(reason, memoOpen);
    setMemoOpen(false);
  };

  const contextValue = {
    memoOpen,
    handleOpen,
    handleClose,
  };

  return (
    <MemoContext.Provider value={contextValue}>
      {props.children}
    </MemoContext.Provider>
  );
};