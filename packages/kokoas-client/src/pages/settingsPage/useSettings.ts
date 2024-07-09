import { ComponentProps, useRef } from 'react';
import { SettingsItem } from './SettingsItem';

export const useSettings = () => {
  const settingsList = useRef<ComponentProps<typeof SettingsItem>[]>([
    {
      settingsName: '工事種別',
      settingsDescription: '工事種別名と利益率の設定',
      link: 'https://rdmuhwtt6gx7.cybozu.com/k/190/',
    },
    {
      settingsName: '社員名簿',
      settingsDescription: '社員の所属店舗や連絡先の設定',
      link: 'https://rdmuhwtt6gx7.cybozu.com/k/34/',
    },
    {
      settingsName: '店舗情報',
      settingsDescription: '店舗名と領域の設定',
      link: 'https://rdmuhwtt6gx7.cybozu.com/k/19/',
    },
    {
      settingsName: '見積大項目',
      settingsDescription: '見積大項目の設定',
      link: 'https://rdmuhwtt6gx7.cybozu.com/k/67/',
    },
    {
      settingsName: '見積中項目',
      settingsDescription: '見積中項目の設定',
      link: 'https://rdmuhwtt6gx7.cybozu.com/k/68/',
    },
    {
      settingsName: '見積部材',
      settingsDescription: '見積部材名と原価の登録',
      link: 'https://rdmuhwtt6gx7.cybozu.com/k/69/',
    },
    {
      settingsName: '取引先事業者設定',
      settingsDescription: '取引先事業者の設定',
      link: 'https://rdmuhwtt6gx7.cybozu.com/k/308/',
    },
    {
      settingsName: 'ANDPAD社外メンバー一覧',
      settingsDescription: 'ANDPAD社外メンバーの設定',
      link: 'https://rdmuhwtt6gx7.cybozu.com/k/309/',
    },
  ]);

  return {
    settingsList: settingsList.current,
  };
};