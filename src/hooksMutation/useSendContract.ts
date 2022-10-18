
import {
  useMutation,
} from '@tanstack/react-query';
import { sendContract } from '../api/docusign/sendContract';

/**
 * A wrapper hook to send contract
 * and mutate db::見積書
 *
 */
export const useSendContract = () => {
  return useMutation(sendContract);

};