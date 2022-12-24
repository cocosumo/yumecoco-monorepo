import { Autocomplete, Stack, TextField } from '@mui/material';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useSearchProjects } from 'kokoas-client/src/hooksQuery';
import { pages } from 'kokoas-client/src/pages/Router';
import { useEffect, useState } from 'react';
import { Control, Controller, ControllerProps, FieldValues, UseControllerProps, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import { Caption } from '../ui';


type Opt = {
  id: string,
  projName: string
};

interface BaseFields extends FieldValues {
  [x: string]: any;
  projName: string;
  projId: string;
}



type FormProps<T extends BaseFields> = {
  controllerProps: UseControllerProps<T>;
};


export function SearchProjects<T extends BaseFields>(
  { controllerProps }: FormProps<T>,
) {

  const [inputVal, setInputVal] = useState('');
  const [options, setOptions] = useState<Array<Opt>>([]);
  const debouncedInput = useDebounce(inputVal, 1000);
  const navigate = useNavigate();
  const {
    control,
    name,
  } = controllerProps;

  const projName = useWatch({
    name: 'projName',
    control: (controllerProps.control as never) as Control<BaseFields>,
    
  });


  const {
    data: recProjects = [],
  } = useSearchProjects(debouncedInput);

  useEffect(() => {

    if (recProjects?.length) {
      const newOptions = recProjects
        ?.map<Opt>((rec) => ({
        id: rec.uuid.value,
        projName: rec.projName.value,
      }));
      setOptions(newOptions);
    }
  }, [recProjects]);

  return (
    <Controller 
      control={control}
      render={({ field }) => {
    
        return (
          <Autocomplete 
            {...field} 
            fullWidth
            value={field.value ? {
              id: field.value,
              projName,
            } : null}
            options={options}
            getOptionLabel={(opt)=> opt.projName}
            isOptionEqualToValue={(opt, v) => opt.id === v.id}
            filterOptions={(x) => x}
            onInputChange={(_, val) => {
              setInputVal(val);
            }}
            onChange={(_, opt) => {
              navigate(`${pages.projEstimate}?${generateParams({
                projId: opt?.id,
              })}`);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='工事情報の検索'
                name={name}
                fullWidth
                placeholder="山田　タロウ"
              />)}
            renderOption={(p, opt) => {
              const key = `listItem-${opt.id}`;
              return (
                <li {...p} key={key}>
                  <Stack>
                    {opt.projName}
                    <Caption text={`id: ${opt.id}`} />
                  </Stack>
                </li>
              );
            }}
          />
        );
      }}
    />
  );
}