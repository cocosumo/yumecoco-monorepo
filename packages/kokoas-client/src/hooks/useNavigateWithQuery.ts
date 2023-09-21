import { useNavigate } from 'react-router-dom';
import { pages } from '../pages/Router';
import qs from 'qs';

export interface NavigateWithQueryProps {
  projId?: string;
  projEstimateId?: string;
  custGroupId?:  string;
  contractId?: string;
}


/**
 *  
 * Navigation hook for convenience of passing query parameters.
 * This is essentially a wrapper of useNavigate() hook, and generateParams() function.
 * 
 * 
 * */
export const useNavigateWithQuery = () => {
  const navigate = useNavigate();

  return <T = NavigateWithQueryProps>(
    path: keyof typeof pages, 
    query?: T,
  ) => {
    
    const stringifiedQuery = qs.stringify(query);

    navigate(`${pages[path]}?${stringifiedQuery}`);
  };
};