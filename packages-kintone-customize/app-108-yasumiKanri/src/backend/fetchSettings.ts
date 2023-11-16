import { getAllRecords, getAppId } from 'api-kintone';

const settingsAppId = 82;

export const fetchSettings = (
  appId: string | number | null = getAppId(),
) => getAllRecords<DBSettings.SavedRecord>({
  condition: `コード = "${appId}"`,
  app: settingsAppId,
});
