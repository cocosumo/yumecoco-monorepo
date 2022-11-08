import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


/**
 * useNavigateは不安定なため、
 * 以下で利用出来ます。
 *
 * ２年たってまだOpenです。
 * https://github.com/remix-run/react-router/issues/7634
 */
export const useStableNavigate = () => {
  const navigate = useNavigate();
  const navigateRef = useRef({ navigate });
  useEffect(() => {
    navigateRef.current.navigate = navigate;
  }, [navigate]);
  return useCallback((location: string) => {
    navigateRef.current.navigate(location);
  }, []);
};