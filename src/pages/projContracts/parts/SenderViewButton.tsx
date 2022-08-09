import { Tooltip } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { FaFileSignature } from '@react-icons/all-files/fa/FaFileSignature';
import { getSenderViewUrl } from '../api/docusign/getSenderViewUrl';
import { useBackdrop } from '../../../hooks/useBackdrop';


/**
 *
 * @param param0
 * @returns
 * @deprecated in favor if sendContract
 */
export const SenderViewButton = ({

  envelopeId,
}: {
  envelopeId: string,

}) => {
  const { setBackdropState } = useBackdrop();
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

  useEffect(()=>{
    console.log('Setting backdrop state', isLoading);
    setBackdropState({
      open: isLoading,
    });
  }, [isLoading]);

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