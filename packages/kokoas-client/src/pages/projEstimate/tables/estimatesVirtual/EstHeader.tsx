import { Paper, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { EstHeaderCell } from './EstHeaderCell';
import { EstRowFormat } from './EstRowFormat';


export const EstHeader = () => {
  return (
    <Stack
      component={Paper}
      spacing={1}
      direction={'row'}
      justifyContent={'space-between'}
      sx={{
        position: 'sticky',
        top: '120px',
        alignSelf: 'flex-start',
        opacity: '0.8',
        zIndex: 100,
        '&:hover': {
          opacity: '1',
        },
        transition: 'all 0.5s',
        background: grey[100],
        py: 0.5,
      }}
    >
      <div />
      <EstRowFormat
        majorItem={(
          <EstHeaderCell>
            {'大項目'}
          </EstHeaderCell>
      )}
        middleItem={(
          <EstHeaderCell>
            {'中項目'}
          </EstHeaderCell>
      )}
        material={(
          <EstHeaderCell>
            {'部材 (手入力可)'}
          </EstHeaderCell>
      )}
        materialDetails={(
          <EstHeaderCell>
            {'品番・色'}
          </EstHeaderCell>
      )}
        costPrice={(
          <EstHeaderCell textAlign={'right'}>
            {'原価'}
          </EstHeaderCell>
      )}
        quantity={(
          <EstHeaderCell>
            {'数量'}
          </EstHeaderCell>
      )}
        profitRate={(
          <EstHeaderCell>
            {'利益率'}
          </EstHeaderCell>
      )}
        taxType={(
          <EstHeaderCell>
            {'課税'}
          </EstHeaderCell>
      )}
        unitPrice={(
          <EstHeaderCell textAlign={'right'}>
            {'単価'}
          </EstHeaderCell>
      )}
        rowUnitPrice={(
          <EstHeaderCell textAlign={'right'}>
            {'金額(税込み)'}
          </EstHeaderCell>
      )}
        rowDetails={(
          <EstHeaderCell>
            {'備考'}
          </EstHeaderCell>
      )}
      />
      <div />
    </Stack>
  );
};