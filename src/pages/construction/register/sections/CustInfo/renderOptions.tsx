import { searchCustGroup } from '../../../../../api/kintone/custgroups/GET';
import { SearchOptions } from '../../../../../components/ui/textfield/FormikSearchField';
import { format } from 'date-fns';

const renderOptions = async (value : string) => {
  return searchCustGroup(value)
    .then(res => {
      const newOptions = res.records.reduce<SearchOptions[]>((accu, curr)=>{
        const custGrpRec =  (curr as unknown as  CustomerGroupTypes.SavedData);
        const mainCust = custGrpRec.members.value[0].value.customerName.value;
        if (mainCust.includes(value)){
          return accu.concat({
            name: mainCust,
            id: custGrpRec.$id.value,
            secondaryLabel: format(Date.parse(custGrpRec.作成日時.value), 'yyyy-MM-dd'),
            subTitle: custGrpRec.storeName.value,
          });
        }

        return accu;

      }, []);

      return newOptions;

    });
};

export default renderOptions;