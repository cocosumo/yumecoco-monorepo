import { useContext } from 'react';
import CustomerFormContext from '../context/CustomerFormContext';
import { FieldActionType, PersonsInCharge } from '../types/forms';


interface MenuItem {
  label: string,
  id: string
}

type AgentItems = {
  [key in keyof PersonsInCharge]: MenuItem[]
};

interface Result {
  stores: MenuItem[]
  agentForm: PersonsInCharge,
  options : AgentItems
  dispatch: (action: FieldActionType) => void
}


type UseCustFormAgentsFunc = () => Result;

const useCustFormAgents : UseCustFormAgentsFunc = () => {

  const context = useContext(CustomerFormContext);
  const personsInCharge = context!.formState.personsInCharge;
  const dispatch = context!.dispatch;
  return {
    stores: [{ id: '1', label: 'テスト店舗' }],
    agentForm: personsInCharge,
    options: {
      emp1: [{ id: '2', label: 'テスト' }],
      emp2: [{ id: '2', label: 'テストa' }],
      yume1: [{ id: '2', label: 'テストb' }],
      yume2: [{ id: '2', label: 'テストc' }],
    },
    dispatch,
  };
};

export default useCustFormAgents;