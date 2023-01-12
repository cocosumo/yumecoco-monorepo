import { OverlayContext } from './../components/ui/containers/Overlay';
import { useContext } from 'react';

export const useOverlayContext = () => {
  const overlayEl = useContext(OverlayContext);


  if (!overlayEl) {
    throw new Error(
      'No context found when calling OverlayContext.',
    );
  }
  return overlayEl;
};