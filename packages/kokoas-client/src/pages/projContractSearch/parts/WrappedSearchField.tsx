import { Button, OutlinedInput, Stack } from '@mui/material';
import { FilterDialog } from './filterDialog/FilterDialog';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { yupResolver } from '@hookform/resolvers/yup';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { initialValues, TypeOfForm } from '../form';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { FilterForm } from './filterDialog/FilterForm';
import { SubmitButton } from './filterDialog/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { validationSchema } from '../formValidation';


export const WrappedSearchField = ({
  minAmount,
  maxAmount,
}: {
  minAmount?: number,
  maxAmount?: number,
}) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const urlParams = useURLParams<TypeOfForm>();
  const navigate = useNavigate();

  const {
    amountFrom,
    amountTo,
    contractDateFrom,
    contractDateTo,
  } = urlParams;

  const newValues = useMemo(() => {
    return {
      ...initialValues,
      contractDateFrom,
      contractDateTo,
      amountTo,
      amountFrom,
    };
  }, [
    amountTo,
    amountFrom,
    contractDateFrom,
    contractDateTo,
  ]);

  const methods = useForm<TypeOfForm>({
    defaultValues: newValues,
    resolver: yupResolver(validationSchema),
  });

  const {
    register,
    reset,
  } = methods;

  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  useEffect(() => {
    reset(newValues);
  },
  [newValues, reset],
  );

  return (
    <FilterForm useFormMethods={methods}>
      {
        minAmount && maxAmount && (
          <FilterDialog
            open={filterOpen}
            minAmount={minAmount}
            maxAmount={maxAmount}
            handleClose={handleFilterClose}
          />
        )
      }

      <Stack direction={'row'} spacing={1}>
        <OutlinedInput fullWidth {...register('mainSearch')} />
        <SubmitButton>
          <SearchIcon />
        </SubmitButton>
        <Button
          variant={'contained'}
          onClick={handleFilterOpen}
        >
          <FilterListIcon />
        </Button>
        <Button
          sx={{ wordBreak: 'keep-all' }}
          onClick={()=>{
            navigate(''); // Clear parameters
          }}
        >
          リセット
        </Button>
      </Stack>

    </FilterForm>
  );
};