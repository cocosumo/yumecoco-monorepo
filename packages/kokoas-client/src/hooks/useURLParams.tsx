import { useLocation } from 'react-router-dom';
import { URLParams } from '../helpers/url';

/**
 * React.Memo optimizes rendering for heavy components.
 * But since I wrapped Router with Memo,
 * getParam no longer trigger whenever the URL changes.
 *
 * This simple hook will serve as replacement.

 * This hook do the following.
 *
 * - Listen to URL changes
 * - parse the URL parameters into object
 *
 * This is experimental...
 *
 * ~ Ras.
 */
export const useURLParams = <T = URLParams>() => {
  const {
    search,
  } = useLocation();

  const params = Object.fromEntries(new URLSearchParams(search));
  return params as T;
};