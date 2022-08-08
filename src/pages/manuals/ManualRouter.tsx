import { Route, Routes } from 'react-router-dom';
import { pages } from '../Router';


const ManualRouter = () => {
  return (
    <Routes>
      <Route path={pages.custSearch} element={<div>Hello</div>} />
      <Route path="/" element={<div>Root test</div>} />
    </Routes>
  );
};

export default ManualRouter;