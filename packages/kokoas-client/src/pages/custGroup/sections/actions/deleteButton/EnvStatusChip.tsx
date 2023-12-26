import { docusignLocale } from 'kokoas-server/src/api/docusign/locale/docusign';
import { CustomChip } from './CustomChip';

const resolveColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'sent':
      return 'info';
    default:
      return 'secondary';
  }
};

export const EnvStatusChip = ({
  envStatus,
}:{
  envStatus: string,
}) => {

  const resolvedStatus = docusignLocale[envStatus] || '未処理';
  
  
  return (
    <CustomChip 
      label={resolvedStatus}
      color={resolveColor(envStatus)}
    />
  );
};