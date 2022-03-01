import { TextField, Autocomplete, Stack } from '@mui/material';
import { format } from 'date-fns';
import { useField } from 'formik';
import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';
import { searchCustGroup } from '../../../api/kintone/custgroups/GET';
import Caption from '../typographies/Caption';


interface FormikSearchFieldProps {
  name: string,
  label: string,
  helperText?: string,
  required?: boolean
}

interface CustomersOptions {
  name: string,
  id: string,
  subTitle?: string,
  secondaryLabel?: string
}

const FormikSearchField = (props: FormikSearchFieldProps) => {
  const [options, setOptions] = useState<readonly CustomersOptions[]>([{ name: 'haller', id: '35' }]);
  const [field, meta, helpers] = useField(props);

  const handleChange = useCallback(debounce((value: string) => {
    console.log(value);
    searchCustGroup(value)
      .then(res => {
        const newOptions = res.records.reduce<CustomersOptions[]>((accu, curr)=>{
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

        console.log(newOptions);

        setOptions(newOptions);

      });

  }, 1000), []);

  return (
    <Autocomplete

      onChange={ (_, newState) => {
        helpers.setValue(newState?.id ?? '');

      }}

      onBlur={field.onBlur}
      isOptionEqualToValue={(option, value) => {
        return option.id === value.id;
      }}

      getOptionLabel={(option) => option.name}

      options={options}
      filterOptions={(x) => x}

      renderInput={(params) => <TextField {...props} {...params}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.error || props.helperText}
        onChange = {(ev) => {
          if (ev.target.value) {
            console.log(ev.target.value);
            handleChange(ev.target.value);
          }
        }}
        />
      }

      renderOption={(p, option) => {
        const key = `listItem-${option.id}`;
        return (
          <li {...p} key={key}>
            <Stack>
              {option.name}
              {option.subTitle && <Caption text={option.subTitle } />}
              {option.secondaryLabel && <Caption text={ `${option.secondaryLabel} id: ${option.id}`} />}
            </Stack>
          </li>
        );
      }}

    />


  );
};

export default FormikSearchField;