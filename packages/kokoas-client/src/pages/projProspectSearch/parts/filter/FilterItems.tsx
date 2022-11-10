import { Chip, Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import { initialValues, KeyOfForm, TypeOfForm } from '../../form';

export const FilterItems = () => {
  const { values, setFieldValue, submitForm } = useFormikContext<TypeOfForm>();
  const {
    rank, projName, custGroupId, projId, memo,
    schedContractPriceMin, schedContractPriceMax,
    estatePurchaseDateMin, estatePurchaseDateMax,
    planApplicationDateMin, planApplicationDateMax,
    schedContractDateMin, schedContractDateMax,
  } = values;

  const items : Array<{
    name: KeyOfForm,
    value?: string,
    label: string,
  }> = [
    ...rank.map(r => ({
      name: 'rank' as KeyOfForm,
      label: 'ランク',
      value: r,
    })),
    { name: 'projName', label: '工事名', value: projName },
    { name: 'custGroupId', label: '工事番号', value: custGroupId },
    { name: 'projId', label: '工事名', value: projId },
    { name: 'memo', label: '備考', value: memo },
    { name: 'schedContractPriceMin', label: '契約予定金額「下」', value: schedContractPriceMin?.toString() },
    { name: 'schedContractPriceMax', label: '契約予定金額「上」', value: schedContractPriceMax?.toString() },

    { name: 'estatePurchaseDateMin', label: '不動産決済日「下」', value: estatePurchaseDateMin?.toString() },
    { name: 'estatePurchaseDateMax', label: '不動産決済日「上」', value: estatePurchaseDateMax?.toString() },

    { name: 'planApplicationDateMin', label: '設計申し込み日「下」', value: planApplicationDateMin?.toString() },
    { name: 'planApplicationDateMax', label: '設計申し込み日「上」', value: planApplicationDateMax?.toString() },

    { name: 'schedContractDateMin', label: '契約予定日「下」', value: schedContractDateMin?.toString() },
    { name: 'schedContractDateMax', label: '契約予定日「上」', value: schedContractDateMax?.toString() },
  ];


  const handleDelete = (name: KeyOfForm, value?: string) => {
    if (name === 'rank') {
      setFieldValue(name, rank.filter((r) => r !== value));
    } else {
      setFieldValue(name, initialValues[name]);
    }

    submitForm();
  };

  return (
    <Grid container spacing={1} justifyContent="flex-start">

      {items
        .filter(({ value }) => Boolean(value))
        .map(({ name, label, value })=> (
          <Grid key={name + value} item xs="auto">
            <Chip
              label={`${label}: ${value}`}
              size="small"
              onDelete={()=> handleDelete(name, value)}
            />
          </Grid>
        ))}


    </Grid>
  );
};