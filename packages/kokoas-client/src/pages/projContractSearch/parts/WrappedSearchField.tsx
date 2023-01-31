import { Button, OutlinedInput, Stack } from '@mui/material';
import { FilterDialog } from './filterDialog/FilterDialog';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { initialValues, TypeOfForm } from '../form';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { FilterForm } from './filterDialog/FilterForm';
import { SubmitButton } from './filterDialog/SubmitButton';


export const WrappedSearchField = ({
  minAmount,
  maxAmount,
}: {
  minAmount?: number,
  maxAmount?: number,
}) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const urlParams = useURLParams<TypeOfForm>();

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
      amountTo: amountTo ?? maxAmount ?? '', // URLで金額範囲を指定していなければ、最大値を設定する。
      amountFrom: amountFrom ?? minAmount ?? '', // ″、最小値を設定する。
    };
  }, [
    maxAmount,
    minAmount,
    amountTo,
    amountFrom,
    contractDateFrom,
    contractDateTo,
  ]);

  const methods = useForm<TypeOfForm>({
    defaultValues: newValues,
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
      </Stack>

    </FilterForm>
  );
};