import { searchCustGroup } from '../../../../api/kintone/custgroups/GET';
import { SearchOptions } from '../../../../components/ui/textfield';
import { format } from 'date-fns';

export const convertRecordToOption = (value: string, record: CustomerGroupTypes.SavedData) => {
  const { $id, storeName, 作成日時, members } = record;
  const mainCust = members.value[0].value;
  const mainCustName = mainCust.customerName.value;

  if (mainCustName.includes(value)){
    return {
      name: mainCustName,
      id: $id.value,
      subTitle: `${storeName.value} ${mainCust.address.value}`,
      secondaryLabel: format(Date.parse(作成日時.value), 'yyyy-MM-dd' ),
      record: record,
    };
  }
};

export const renderOptions = async (value : string) => {
  return searchCustGroup(value)
    .then(res => {

      const newOptions = res.records.reduce<SearchOptions[]>((accu, curr)=>{
        const custGrpRec =  (curr as unknown as  CustomerGroupTypes.SavedData);
        const convertedOption = convertRecordToOption(value, custGrpRec);
        if (convertedOption){
          return accu.concat(convertedOption);
        }

        return accu;

      }, []);

      return newOptions;

    });
};