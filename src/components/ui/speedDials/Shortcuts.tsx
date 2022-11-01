import { SpeedDial } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import CarpenterIcon from '@mui/icons-material/Carpenter';
import SpeedDialAction from '@mui/material/SpeedDialAction';
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
}: {
  shortcuts : Array<{
    type: ShortCutType,
    handleClick: ()=>void
  }
  >,
}) => {
  return (
    <SpeedDial
      ariaLabel="Menu"
      sx={{ position: 'fixed', bottom: 16, right: 36, zIndex: 3000 }}
      icon={<SpeedDialIcon />}
    >
      {shortcuts.map(({ type, handleClick }) => {
        return (
          <SpeedDialAction
            key={type}
            icon={shortcutIcons[type]}
            tooltipTitle={getTooltipTitle(type)}
            tooltipOpen
            onClick={handleClick}
          />
        );
      })}



    </SpeedDial>
  );

};