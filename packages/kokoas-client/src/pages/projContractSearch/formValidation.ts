import * as Yup from 'yup';
import {
  KeyOfForm } from './form';



/* MAIN VALIDATION SCHEMA */

export const validationSchema =  Yup
  .object()
  .shape <Partial<Record<KeyOfForm, Yup.AnySchema>>>({
});