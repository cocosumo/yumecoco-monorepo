import { RecordType } from '../config';

export const calculateEstimateRecord = ({
  record,
} : {
  record: RecordType
}) => {
  const {
    内訳: { value: estimatesTable },
    税: { value: tax },
    uuid: { value: recordId },
  } = record;

  const taxRate = +tax / 100;

  const calculatedEstimateTable = estimatesTable.map(({
    value: {
      
    }
  }) => {

  })
};