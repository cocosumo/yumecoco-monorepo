import { TableSortLabel } from '@mui/material';
import { translations } from 'kokoas-client/src/helpers/translations';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { TypeOfForm } from '../../form';
import { ContractRow } from '../../hooks/useFilteredContracts';
import { useSubmitHandler } from '../../hooks/useSubmitHandler';

export const ResultsTHeadSortLabel = ({
  headerLabel,
}: {
  headerLabel: keyof ContractRow,
}) => {
  const {
    order,
    orderBy,
  } = useURLParams<TypeOfForm>();
  const handleSubmit = useSubmitHandler();

  return (
    <TableSortLabel
      active={orderBy === headerLabel}
      direction={order}
      onClick={() => {
        handleSubmit({
          newData: {
            orderBy: headerLabel,
            order: order === 'asc' ? 'desc' : 'asc',
          },
        });
      }}
    >
      {translations[headerLabel as string]}
    </TableSortLabel>
  );
};