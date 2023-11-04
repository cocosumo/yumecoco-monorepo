import { KForm } from '../schema';

export const translateKey = (key: KForm) => {
  switch (key) {
    case 'contractCompleted': return '契約完了';
    case 'contractIncomplete': return '契約未完了';
    default: return key;
  }
};
