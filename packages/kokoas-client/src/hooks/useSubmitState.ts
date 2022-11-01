import { AlertColor } from '@mui/material';
import { useEffect, useState } from 'react';
import { FieldActionType } from '../types/form.memo';


interface UseSubmitState {
  formState : FormState,
  dispatch: (action: FieldActionType)=>void,
  saveToDb: () => Promise<any>
}

interface SnackState {
  open: boolean,
  message: string,
  severity: AlertColor
}

export const useSubmitState = (form: UseSubmitState) => {
  const [snackState, setSnackState] = useState<SnackState>({ open: false, message: '', severity: 'info' });

  const { formState, dispatch, saveToDb } = form;

  useEffect(()=>{

    switch (formState.submitState) {
      case 'VALIDATE_ERROR':
        setSnackState(prev => ({ ...prev,
          open: true,
          message: '入力内容をご確認ください。',
          severity: 'error',
        }));
        break;

      case 'CONFIRM_SAVE':
        setSnackState(prev=> ({ ...prev,
          open: true,
          message: '処理中',
          severity: 'info',
        }));
        saveToDb()
          .then(() => {
            dispatch({ type: 'CHANGE_SUBMITSTATE', payload: { submitState: 'SUCCESS' } });
          })
          .catch((error)=>{
            console.log(error);
            dispatch({ type: 'CHANGE_SUBMITSTATE', payload: { submitState: 'FETCH_ERROR' } });
          });
        break;

      case 'FETCH_ERROR':
        setSnackState(prev=> ({ ...prev,
          open: true,
          message: 'エラーが発生しました。',
          severity: 'error',
        }));
        break;

      case 'SUCCESS':
        setSnackState(prev=> ({ ...prev,
          open: true,
          message: 'メモが保存出来ました！',
          severity: 'success',
        }));
        break;
    }

  }, [formState.submitState]);



  return {
    snackState,
    handleClose: ()=> {
      setSnackState(prev => ({ ...prev, open: false }));
      dispatch({ type: 'CHANGE_SUBMITSTATE', payload: { submitState: 'EDITTING' } });
    },
  };

};

export default useSubmitState;