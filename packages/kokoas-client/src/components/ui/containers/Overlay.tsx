import styles from './overlay.module.css';
import DarkCocoTheme from './../../themes/DarkCocoTheme';
import { createContext, MutableRefObject, ReactNode, useRef } from 'react';

export const OverlayContext = createContext<MutableRefObject<HTMLDivElement | null>>({
  current: null,
}); 

/**
 * Kintoneを隠すコンポーネントで、最上コンテナーになります。
 * bodyと同様。
 */
export const  Overlay = ({ children }: { children: ReactNode }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={styles.overlay} ref={overlayRef}>
      <OverlayContext.Provider value={overlayRef}>

        <DarkCocoTheme>
          {children}
        </DarkCocoTheme>

      </OverlayContext.Provider>
    </div>
  );
};


export default Overlay;