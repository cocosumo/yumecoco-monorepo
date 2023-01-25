import { Stack } from '@mui/material';
import { ReqSendContract } from 'types';

import { MethodChoiceButton } from './MethodChoiceButton';

export const MethodChoice = ({
  handleSendContract,
  handleConfirmElectronic,
}:{
  handleSendContract: (
    signMethod: ReqSendContract['signMethod']
  ) => void
  handleConfirmElectronic : () => void
}) => {

  return (
    <Stack spacing={2} direction={'column'}>

      <MethodChoiceButton
        mainLabel='電子手続き'
        secondaryLabel='顧客と担当者が電子サインしたら、店長と経理が最終確認を行います。'
        handleClick={handleConfirmElectronic}
      />

      <MethodChoiceButton
        mainLabel='紙印刷'
        secondaryLabel='担当者が印刷し、サインが出来たら、またこちらにアップロードしてください。店長と経理が最終確認を行います。'
        handleClick={()=> handleSendContract('wetInk')}
      />

    </Stack>
  );
};