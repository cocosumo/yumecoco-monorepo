import { searchCustGroup } from '../../../../../api/kintone/custgroups/GET';
import { SearchOptions } from '../../../../../components/ui/textfield/FormikSearchField';
import { format } from 'date-fns';

const renderOptions = async (value : string) => {
  return searchCustGroup(value)
    .then(res => {

      const newOptions = res.records.reduce<SearchOptions[]>((accu, curr)=>{
        const custGrpRec =  (curr as unknown as  CustomerGroupTypes.SavedData);
        const { $id, storeName, 作成日時, members } = custGrpRec;
        const mainCust = members.value[0].value;
        const mainCustName = mainCust.customerName.value;

        if (mainCustName.includes(value)){
          return accu.concat({
            name: mainCustName,
            id: $id.value,
            subTitle: `${storeName.value} ${mainCust.address.value}`,
            secondaryLabel: format(Date.parse(作成日時.value), 'yyyy-MM-dd' ),
            record: custGrpRec,
          });
        }

        return accu;

      }, []);

      return newOptions;

    });
};

export default renderOptions;