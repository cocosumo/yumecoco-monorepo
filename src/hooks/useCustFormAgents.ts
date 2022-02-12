import { useContext, useState, useEffect } from 'react';
import CustomerFormContext from '../context/CustomerFormContext';
import { FieldActionType, InputField, PersonsInCharge } from '../types/forms';
import useStores from './useStores';
import useEmployees from './useEmployees';

interface GroupedEmpOptions {
  [key: string] : Options,
  coco: Options,
  yume: Options
}

interface Result {
  stores: Options
  storeState: InputField
  agentForm: PersonsInCharge,
  isSubmitted: boolean,
  groupedEmpOptions : GroupedEmpOptions,
  isWithCocoAgents: boolean,
  dispatch: (action: FieldActionType) => void
}

const initialEmpOptions: GroupedEmpOptions = { coco: [], yume: [] };

type UseCustFormAgentsFunc = () => Result;

const useCustFormAgents : UseCustFormAgentsFunc = () => {
  const { stores } = useStores();
  const context = useContext(CustomerFormContext);
  const { employees, loading } = useEmployees();
  const [empOptions, setEmpOptions] = useState(initialEmpOptions);

  const formState = context!.formState;
  const isSubmitted = formState.isSubmitted;
  const personsInCharge = formState.agents;
  const storeState = formState.store;
  const dispatch = context!.dispatch;


  useEffect(()=>{
    if (!loading && storeState.value.length !== 0 ){

      setEmpOptions(employees.reduce((prev, curr)=> {
        const { storeNumber, $id, 文字列＿氏名: empName, affiliation } = curr;

        if (storeNumber.value === storeState.value) {
          let group;
          switch (affiliation.value){
            case 'ここすも': group = 'coco'; break;
            case 'ゆめてつ' : group = 'yume'; break;
            default: return prev;
          }

          return { ...prev, ...{ [group]: prev[group].concat({ label: empName.value, value: $id.value }) } };
        }

        return prev;
      }, initialEmpOptions));
    }

  }, [loading, storeState]);


  return {
    stores: stores,
    storeState: storeState,
    agentForm: personsInCharge,
    isSubmitted: isSubmitted,
    groupedEmpOptions: {
      coco: empOptions.coco,
      yume: empOptions.yume,
    },
    isWithCocoAgents: empOptions.coco.length > 0,
    dispatch,
  };
};

export default useCustFormAgents;