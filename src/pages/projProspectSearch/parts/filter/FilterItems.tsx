import { Chip, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { KeyOfForm, TypeOfForm } from '../../form';

export const FilterItems = () => {
  const { values, setFieldValue } = useFormikContext<TypeOfForm>();
  const { rank } = values;

  let items : Array<{
    name: KeyOfForm,
    value: string,
  }> = [];

  items.push(...rank.map(r => ({
    name: 'rank' as KeyOfForm,
    value: r,
  })));

  const handleDelete = (name: KeyOfForm, value: string) => {
    if (name === 'rank') {
      setFieldValue(name, rank.filter((r) => r !== value));
    }
  };

  return (
    <Stack direction={'row'} spacing={1}>

      {items.map(({ name, value })=> (
        <Chip
          key={name + value}
          label={value}
          size="small"
          onDelete={()=> handleDelete(name, value)}/>
      ))}


    </Stack>
  );
};