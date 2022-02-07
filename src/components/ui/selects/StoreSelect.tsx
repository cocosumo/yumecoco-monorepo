
import BasicSelect from './BasicSelect';



export default function StoreSelect() {
  /* TODO: Pull from database */
  const stores: Options = [
    {
      value: '1',
      label: '豊田店',
    },

  ];

  return (
    <BasicSelect value="" helperText={'nothing'} hasError={true} name="test" label="店舗" options={stores} isRequired />
  );
}