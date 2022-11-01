import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps, ToggleButtonProps, Tooltip } from '@mui/material';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';

type TResultFormat = 'table' | 'card';

/**
 * valueのタイプ安全にするために、ToggleButtonラッピングしました。
 *  */
const WrappedToggleButton = (
  { toolTip,
    ...others
  }: ToggleButtonProps & {
    value: TResultFormat
    toolTip: string,
  },
) => (
  <Tooltip title={toolTip}>
    <ToggleButton {...others} />
  </Tooltip>
);

/**
 * 表示方法の選択
 */
export const ResultsFormat = ({
  format,
  handleFormat,
} : {
  format: TResultFormat
  handleFormat: ToggleButtonGroupProps['onChange']
}) => {





  return (
    <ToggleButtonGroup
      color="primary"
      value={format}
      onChange={handleFormat}
      exclusive
      size={'small'}
    >
      <WrappedToggleButton value="table" toolTip='テーブル式'>
        <TableRowsIcon />
      </WrappedToggleButton>
      <WrappedToggleButton value="card" toolTip='カード式' >
        <ViewAgendaIcon />
      </WrappedToggleButton>

    </ToggleButtonGroup>
  );
};