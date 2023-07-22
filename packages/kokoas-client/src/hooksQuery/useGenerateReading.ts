import { useQuery } from '@tanstack/react-query';
import { openAIBaseUrl } from '../api/ai/config';
import { generateReading } from '../api/ai/generateReading';


/**
 * 見積レコードを全て取得する
 */
export const useGenerateReading = (
  text: string, 
) => {
  return useQuery(
    [openAIBaseUrl, text],
    () => setTimeout(() => generateReading(text), 1000),
    {
      enabled: false,
    },
  );
};