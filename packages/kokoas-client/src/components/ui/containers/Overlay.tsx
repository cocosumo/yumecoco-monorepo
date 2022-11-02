import styles from './overlay.module.css';
import DarkCocoTheme from './../../themes/DarkCocoTheme';
import { ReactNode } from 'react';

export const  Overlay = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.overlay}>
      <DarkCocoTheme>
        {children}
      </DarkCocoTheme>
    </div>
  );
};


export default Overlay;