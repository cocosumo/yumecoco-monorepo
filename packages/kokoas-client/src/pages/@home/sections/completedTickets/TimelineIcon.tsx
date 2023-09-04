
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import BugReportIcon from '@mui/icons-material/BugReport';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TimelineDot, TimelineDotProps } from '@mui/lab';
import { Badge, BadgeProps, Tooltip, keyframes, styled } from '@mui/material';
import { red } from '@mui/material/colors';
import { ReactNode } from 'react';

export type TUpdateType = '追加' | '変更' | '修正';
type TimelineIconProps = {
  updateType: TUpdateType;
  isNew: boolean;
  recId: string;
};


const animation = keyframes`
  0% {
    box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
  }
  100% {
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0);
}`;

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -6,
    top: -4,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    animation: `${animation} 2s infinite`,
    backgroundColor: red[800],
  },
}));


export const TimelineIcon = ({
  updateType,
  isNew,
  recId,
}: TimelineIconProps) => {

  let toolTipTitle = '';
  let Icon : ReactNode | null = null;
  let color: TimelineDotProps['color'] = 'success';

  switch (updateType) {
    case '追加':
      toolTipTitle = '新しい機能';
      Icon = (<AddCircleIcon fontSize='small' />);
      color = 'success';
      break;
    case '変更':
      toolTipTitle = '既存の機能が変更されました';
      Icon = (<ChangeCircleIcon fontSize='small' />);
      color = 'info';
      break;
    case '修正':
      toolTipTitle = '不具合が修正されました';
      Icon = (<BugReportIcon fontSize='small' />);
      color = 'warning';
      break;
  }


  return  (
    <Tooltip title={`${toolTipTitle} - id: ${recId}`}>
      <TimelineDot color={color}>
        {isNew && (
        <StyledBadge badgeContent={'新'}>
          {Icon}
        </StyledBadge>)}
        {!isNew && Icon}
      </TimelineDot>
    </Tooltip>
  );
};