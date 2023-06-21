import { RowLayout, RowLayoutProps } from './RowLayout';
import { DetailsDialog } from './details/DetailsDialog';
import { useNavigate } from 'react-router-dom';
import { pages } from 'kokoas-client/src/pages/Router';
import qs from 'qs';
import { useURLParamsV2 } from 'kokoas-client/src/hooks/useURLParamsV2';


type DetailsDialogProps = {
  open: boolean;
};

export const ResultRow = (props: RowLayoutProps) => {

  const {
    uuid: projId,
    projName,
  } = props;

  const navigate = useNavigate();

  const {
    open = true,
  } = useURLParamsV2<DetailsDialogProps>();

  const handleOpen = () => {
    navigate(`${pages.projSearch}?${qs.stringify({ open: true })}`);
  };

  const handleClose = () => {
    navigate(`${pages.projSearch}?${qs.stringify({ open: false })}`);
  };

  return (
    <>


      <RowLayout {...props} onClick={handleOpen} />
   
      <DetailsDialog 
        open={open} 
        handleClose={handleClose}
        projId={typeof projId === 'string' ? projId : ''}
        projName={typeof projName === 'string' ? projName : ''}
      />
    </>

  );
};