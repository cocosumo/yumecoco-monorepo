import { KeyOfForm } from '../form';

export const translateKey = (key: KeyOfForm) => {
  switch (key) {
    case 'contractCompleted': return '契約完了';
    case 'contractIncomplete': return '契約未完了';
    case 'contractStepTencho': return '店長確認中';
    case 'contractStepCustomer': return '顧客確認中';
    case 'contractStepAG': return 'AG確認中';
    case 'contractStepAccounting': return '会計確認中';
    case 'contractStepMain': return '本部確認中';
    default: return key;
  }
};
