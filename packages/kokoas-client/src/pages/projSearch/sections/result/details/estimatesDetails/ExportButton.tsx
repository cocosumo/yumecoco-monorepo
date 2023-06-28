import { Button, Menu, MenuItem } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useState } from 'react';
import { kokoasAPIBaseUrl } from 'config';
import { kokoasEndpoints } from 'libs';
export const ExportButton = ({
  projEstimateId,
}: {
  projEstimateId: string
}) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = (url: string) => {
    window.open(url);
    handleClose();
  };

  return (
    <>
      <Button
        size='small'
        variant='outlined'
        startIcon={<FileDownloadIcon />}
        onClick={handleClick}
      >
        出力
      </Button>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        <MenuItem
          onClick={() => handleDownload(`${kokoasAPIBaseUrl}/${kokoasEndpoints.downloadEstimateAsAndpad}/${projEstimateId}`)}
        >
          Andpadの見積形式
        </MenuItem>
        <MenuItem
          onClick={() => handleDownload(`${kokoasAPIBaseUrl}/${kokoasEndpoints.downloadEstimateAsAndpadEst}/${projEstimateId}`)}
        >
          Andpadの実行予算形式
        </MenuItem>
        <MenuItem
          onClick={() => handleDownload(`${kokoasAPIBaseUrl}/${kokoasEndpoints.downloadEstimateForCustomer}/${projEstimateId}`)}
        >
          顧客用形式
        </MenuItem>
      </Menu>
    </>
  );
};