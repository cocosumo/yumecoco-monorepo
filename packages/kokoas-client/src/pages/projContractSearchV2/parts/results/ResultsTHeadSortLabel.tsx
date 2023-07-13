import { TableSortLabel, TableSortLabelProps } from '@mui/material';
import { grey } from '@mui/material/colors';
import { translations } from 'kokoas-client/src/helpers/translations';
import { ContractRow } from '../../hooks/useFilteredContracts';
import { useSubmitHandler } from '../../hooks/useSubmitHandler';
import { useTypedURLParams } from '../../hooks/useTypedHooks';

export const ResultsTHeadSortLabel = ({
  headerLabel,
}: {
  headerLabel: keyof ContractRow,
}) => {
  const {
    order,
    orderBy,
  } = useTypedURLParams();
  const handleSubmit = useSubmitHandler();

  return (
    <TableSortLabel
      active={orderBy === headerLabel}
      direction={order as TableSortLabelProps['direction']}
      onClick={() => {
        handleSubmit({
          newData: {
            orderBy: headerLabel,
            order: order === 'asc' ? 'desc' : 'asc',
          },
        });
      }}
      sx={{
        fontWeight: 700,
        color: grey[600],
      }}
    >
      {translations[headerLabel as string]}
    </TableSortLabel>
  );
};