import styles from './overlay.module.css';
import DarkCocoTheme from './../../themes/DarkCocoTheme';

export const  Overlay = ({ children }: Props) => {
  return (
    <div className={styles.overlay}>
      <DarkCocoTheme>
        {children}
      </DarkCocoTheme>
    </div>
  );
};


export default Overlay;