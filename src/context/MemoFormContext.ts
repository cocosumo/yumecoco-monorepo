import React from 'react';
import { MemoFormState, FieldActionType } from '../types/form.memo';

interface IContextProps {
  formState: MemoFormState;
  dispatch: (action: FieldActionType) => void;
}

const MemoFormContext = React.createContext<null | IContextProps>(null);

export function useCustomContext() {
  return React.useContext(MemoFormContext);
}

export default MemoFormContext;