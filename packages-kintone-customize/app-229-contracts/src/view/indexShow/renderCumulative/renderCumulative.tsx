import { createRoot } from 'react-dom/client';
import { FormCumulative } from './FormCumulative';



export const renderCumulative = () => {
  const root = createRoot(document.getElementById('root') as Element);

  root.render(<FormCumulative />);
};