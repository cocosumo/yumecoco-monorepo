import { Stack } from '@mui/material';
import { ChoiceButton } from './ChoiceButton';

export const MethodChoice = () => {
  return (
    <Stack spacing={2} direction={'column'}>

      <ChoiceButton
        mainLabel='電子手続き'
        secondaryLabel='顧客と担当者が電子サインしたら、店長と経理が最終確認を行います。'
        handleClick={() => alert('申し訳ございませんが、開発中です。')}
      />

      <ChoiceButton
        mainLabel='紙印刷'
        secondaryLabel='担当者が印刷し、サインが出来たら、またこちらにアップロードしてください。店長と経理が最終確認を行います。'
        handleClick={() => alert('申し訳ございませんが、開発中です。')}
      />

    </Stack>
  );
};