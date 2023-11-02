import { Button, DialogActions, DialogContent, Stack } from '@mui/material';
import { MethodChoiceButton } from './MethodChoiceButton';
import { BiChip } from '@react-icons/all-files/bi/BiChip';
import { FaFileSignature } from '@react-icons/all-files/fa/FaFileSignature';
import { TSignMethod } from 'types';
import { useTypedWatch } from '../../../hooks/useTypedRHF';

//　サービス工事のprojTypeId
const serviceProjTypeid = '3b450da3-19fe-45bd-2406-3ded7f44fe86';

export const StepChooseSignMethod = ({
  handleClose,
  handleChooseMethod,
} : {
  handleClose: () => void,
  handleChooseMethod: (signMethod: TSignMethod) => void,
}) => {

  const projTypeId = useTypedWatch({
    name: 'projTypeId',
  });


  return (
    <>
      <DialogContent>
        <Stack spacing={2}>
          
          <MethodChoiceButton
            mainLabel='電子手続き'
            secondaryLabel='顧客と担当者が電子サインしたら、店長と経理が最終確認を行います。'
            handleClick={()=> handleChooseMethod('electronic')}
            startIcon={<BiChip size={30} />}
          />

          {projTypeId !== serviceProjTypeid && ( // K247により
          <MethodChoiceButton
            mainLabel='紙印刷'
            secondaryLabel='担当者が印刷し、サインが出来たら、アップロードしてください。店長と経理が最終確認を行います。'
            handleClick={()=> handleChooseMethod('wetInk')}
            startIcon={<FaFileSignature size={24} />}
          />
          )}

        </Stack>

      </DialogContent>
      <DialogActions>
        <Button
          color='error'
          variant='outlined'
          onClick={handleClose}
        >
          キャンセル
        </Button>
      </DialogActions>
    </>
  );
};