import { Box, Paper, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ItemRowFormat } from './ItemRowFormat';
import { ItemsTHeadCell } from './ItemsTHeadCell';

export const ItemsTHead = () => {
  return (
    <Stack
      component={Paper}
      spacing={1}
      direction={'row'}
      justifyContent={'space-between'}
      sx={{
        position: 'sticky',
        top: '0px',
        alignSelf: 'flex-start',
        opacity: '0.8',
        zIndex: 100,
        '&:hover': {
          opacity: '1',
        },
        transition: 'all 0.5s',
        background: grey[100],
      }}
    >
      <Box width={'3%'} />
      <ItemRowFormat
        majorItem={(
          <ItemsTHeadCell>
            大項目
          </ItemsTHeadCell>
      )}
        middleItem={(
          <ItemsTHeadCell>
            中項目
          </ItemsTHeadCell>
      )}
        material={(
          <ItemsTHeadCell>
            部材
          </ItemsTHeadCell>
      )}
        costPrice={(
          <ItemsTHeadCell textAlign={'right'}>
            原価
          </ItemsTHeadCell>
      )}
        quantity={(
          <ItemsTHeadCell>
            数量（単位）
          </ItemsTHeadCell>
      )}
        profitRate={(
          <ItemsTHeadCell>
            利益率
          </ItemsTHeadCell>
      )}
        unitPrice={(
          <ItemsTHeadCell textAlign={'right'}>
            単価
          </ItemsTHeadCell>
      )}
        rowUnitPrice={(
          <ItemsTHeadCell textAlign={'right'}>
            金額
          </ItemsTHeadCell>
      )}
        rowCostPrice={(
          <ItemsTHeadCell >
            原価
          </ItemsTHeadCell>
      )}
      />
      <div />
    </Stack>
  );
};