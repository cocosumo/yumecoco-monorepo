
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import BugReportIcon from '@mui/icons-material/BugReport';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TimelineDot } from '@mui/lab';
import { Tooltip } from '@mui/material';

export type TUpdateType = '追加' | '変更' | '修正';


export const TimelineIcon = ({
  updateType,
}: {
  updateType: TUpdateType;
}) => {
  switch (updateType) {
    case '追加':
      return  (
        <Tooltip title="新しい機能">
          <TimelineDot color='success'>
            <AddCircleIcon fontSize='small' />
          </TimelineDot>
        </Tooltip>
      );
    case '変更':
      return (
        <Tooltip title="既存の機能を変更されました">
          <TimelineDot color='info'>
            <ChangeCircleIcon fontSize='small' />
          </TimelineDot>
        </Tooltip>
      );
    case '修正':
      return (
        <Tooltip title="不具合を修正されました">
          <TimelineDot color='warning'>
            <BugReportIcon fontSize='small' />
          </TimelineDot>
        </Tooltip>
      );
  }
};