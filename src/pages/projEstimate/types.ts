import { TypeOfForm } from './form';

export interface TArrayHelpers {
  push : Function,
  remove: Function,
  form: {
    values: TypeOfForm,
  }
}