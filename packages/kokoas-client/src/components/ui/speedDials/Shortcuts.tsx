import { SpeedDial, SpeedDialProps } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import CarpenterIcon from '@mui/icons-material/Carpenter';
import SpeedDialAction, { SpeedDialActionProps } from '@mui/material/SpeedDialAction';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AttributionIcon from '@mui/icons-material/Attribution';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';



const shortcutIcons = {
  'delete' : <DeleteIcon />,
  'project' : <CarpenterIcon />,
  'custGroup' : <PeopleAltIcon />,
  'prospect' : <AttributionIcon />,
  'contract' : <HistoryEduIcon />,
  'estimate' : <FormatListNumberedIcon />,
} as const;

export type ShortCutType = keyof typeof shortcutIcons;


const getTooltipTitle = (type: ShortCutType) => {
  switch (type) {
    case 'delete': return '削除';
    case 'project': return '工事情報編集';
    case 'custGroup': return '顧客編集';
    case 'prospect' : return '見込み管理';
    case 'contract' : return '契約';
    case 'estimate' : return '見積登録';
    default : return <AutorenewIcon />;
  }
};


export const Shortcuts = ({
  shortcuts,
  speedDialProps,
  speedDialActionProps,
}: {
  shortcuts : Array<{
    type: ShortCutType,
    handleClick: ()=>void
  }>,
  speedDialProps?: Partial<SpeedDialProps>,
  speedDialActionProps?: Partial<SpeedDialActionProps>
}) => {

  const {
    sx = { position: 'fixed', bottom: 16, right: 36, zIndex: 3000 },
    icon = <SpeedDialIcon />,
    ariaLabel = 'Shortcut',
    ...otherSpeedDialProps
  } = speedDialProps || {};

  const {
    tooltipOpen = true,
    ...otherSpeedDialActionProps
  } = speedDialActionProps || {};

  return (
    <SpeedDial
      {...otherSpeedDialProps}
      ariaLabel={ariaLabel}
      sx={sx}
      icon={icon}
    >
      {shortcuts.map(({ type, handleClick }) => {
        return (
          <SpeedDialAction
            {...otherSpeedDialActionProps}
            key={type}
            icon={shortcutIcons[type]}
            tooltipTitle={getTooltipTitle(type)}
            tooltipOpen={tooltipOpen}
            onClick={handleClick}
          />
        );
      })}



    </SpeedDial>
  );

};