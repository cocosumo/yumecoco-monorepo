import { Box, TableHead, TableSortLabel } from '@mui/material';
import { KRowLayoutProps, RowLayout } from './RowLayout';
import { Order } from 'types';
import { visuallyHidden } from '@mui/utils';

export interface IOrder {
  orderBy: KRowLayoutProps,
  order: Order,
}

export interface PayTableHeadProps {
  handleChangeOrder: (newOrder: IOrder) => void,
  orderDetails: IOrder,
}

const EnhancedTableCell = ({
  fieldName,
  label,
  orderDetails,
  handleChangeOrder,
}: PayTableHeadProps & {
  fieldName: KRowLayoutProps,
  label: string,
}) => {

  const {
    order,
    orderBy,
  } = orderDetails;



  const isActive = (orderBy ) === fieldName;

  return (
    <TableSortLabel
      active={isActive}
      direction={isActive ? order : 'asc'}
      onClick={() => {
        handleChangeOrder({
          orderBy: fieldName,
          order: order === 'asc' ? 'desc' : 'asc',
        });
      }}
    >
      {label}
      <Box component="span" sx={visuallyHidden}>
        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
      </Box>
    </TableSortLabel>
  );
};

export const PayTableHead = (props : PayTableHeadProps) => {
  return (
    <TableHead>
      <RowLayout 
        index={'No'}
        paymentStatus={(
          <EnhancedTableCell
            fieldName='paymentStatus'
            label='状況'
            {...props}
          />
          )}
        paymentType={(
          <EnhancedTableCell
            fieldName='paymentType'
            label='項目'
            {...props}
          />
        )}
        paymentMethod={(
          <EnhancedTableCell
            fieldName='paymentMethod'
            label='入金区分'
            {...props}
          />
        )}
        paymentDate={(
          <EnhancedTableCell
            fieldName='paymentDate'
            label='入金日'
            {...props}
          />
        )}
        billingDate={(
          <EnhancedTableCell
            fieldName='billingDate'
            label='請求日'
            {...props}
          />)}
        paymentAmount={(
          <EnhancedTableCell
            fieldName='paymentAmount'
            label='入金予定額'
            {...props}
          />
        )}
        actualPaymentAmount={(
          <EnhancedTableCell
            fieldName='actualPaymentAmount'
            label='入金額'
            {...props}
          />
        )}
        handlingFee={(
          <EnhancedTableCell
            fieldName='handlingFee'
            label='調整額'
            {...props}
          />
        )}
        remarks={(
          <EnhancedTableCell
            fieldName='remarks'
            label='備考'
            {...props}
          />
        )}
      />

    </TableHead>
  );
};