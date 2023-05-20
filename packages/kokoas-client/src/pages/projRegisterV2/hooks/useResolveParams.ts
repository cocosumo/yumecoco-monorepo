import { useState } from 'react';
import { initialValues } from '../form';

export const useResolveParams = () => {
  const [newFormVal, setNewFormVal] = useState(initialValues);

  return { newFormVal };
};