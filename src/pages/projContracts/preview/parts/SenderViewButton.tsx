import { Tooltip } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { FaFileSignature } from 'react-icons/fa';
import { getSenderViewUrl } from '../api/docusign/getSenderViewUrl';



export const SenderViewButton = ({

  envelopeId,
}: {
  envelopeId: string,

}) => {
  const [isLoading, setIsLoading] = useState(false);


  const handleConfirmVoid = async () =>{
    setIsLoading(true);
    const { url } = await getSenderViewUrl({
      envelopeId,
      returnUrl: window.location.href,
    });

    if (url) {
      console.log(url);


      // Redirect
      window.location.replace(url);
    }
    setIsLoading(false);
  };

  return (
    <Tooltip title="Docusignで開く" arrow>
      <div> {/* Tooltip doesn't like disabled element, so I added extra layer */}
        <LoadingButton
          loading={isLoading}
          onClick={handleConfirmVoid}
          variant="text"
          loadingPosition="center"
        >
          <FaFileSignature size={24}/>
        </LoadingButton>
      </div>
    </Tooltip>
  );
};