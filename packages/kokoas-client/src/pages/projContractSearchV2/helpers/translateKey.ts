import { KForm } from '../schema';

export const translateKey = (key: KForm) => {
  switch (key) {
    case 'contractCompleted': return '契約完了';
    case 'contractIncomplete': return '契約未完了';
    case 'contractStepTencho': return '店長確認中';
    case 'contractStepCustomer': return '顧客確認中';
    case 'contractStepAG': return '担当者確認中';
    case 'contractStepAccounting': return '経理確認中';
    case 'contractStepMain': return '本社確認中';
    default: return key;
  }
};
