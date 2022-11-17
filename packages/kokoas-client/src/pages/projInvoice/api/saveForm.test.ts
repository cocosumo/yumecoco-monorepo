/* import { TypeOfForm } from '../form';
import { saveForm } from './saveForm';

const UpdateForm: TypeOfForm = {
  invoiceId: '2',
  projId: '123',
  projName: 'dummy',
  amountType: '着工金',
  billingAmount: '100000',
  plannedPaymentDate: '2022-10-27',
  estimates: [{
    isForPayment: true,
    estimateId: '73',
  }, {
    isForPayment: false,
    estimateId: '75',
  }],
};

const addForm: TypeOfForm = {
  invoiceId: '2',
  projId: '123',
  projName: 'dummy',
  amountType: '着工金',
  billingAmount: '100000',
  plannedPaymentDate: '2022-10-27',
  estimates: [{
    isForPayment: true,
    estimateId: '73',
  }, {
    isForPayment: false,
    estimateId: '75',
  }],
};


const errorForm: TypeOfForm = {
  invoiceId: '',
  projId: '0',
  projName: 'dummy',
  amountType: '着工金',
  billingAmount: '100000',
  plannedPaymentDate: '2022-10-27',
  estimates: [{
    isForPayment: true,
    estimateId: '73',
  }, {
    isForPayment: false,
    estimateId: '75',
  }],
};

describe('saveForm', () => {
  it('should save', async () => {
    const result = await saveForm(addForm);
    expect(result).toMatchSnapshot();
  });

  it('should update', async () => {
    const result = await saveForm(UpdateForm);
    expect(result).toMatchSnapshot();
  });
  
  it('should error', async () => {
    expect(() => saveForm(errorForm)).rejects.toThrow();
  });
}); */