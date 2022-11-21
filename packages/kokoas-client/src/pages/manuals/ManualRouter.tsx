import { Route, Routes } from 'react-router-dom';
import { pages } from '../Router';
import HelpMain from './pages/HelpMain';

/**
 * ヘルプ(マニュアル)の各ページへのルートを定義する
 * ページへのパスは、本体ココアスの構成に合わせて実装する
 * ex.)[*pass]/customer/search -> [*pass]/help/customer/search
 * @returns ヘルプ(マニュアル)の各ページへのルート
 * @deprecated Kintoneで管理することになります。
 */
const ManualRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HelpMain />} />

      <Route path={pages.custGroupEdit} element={<div>
        custGroupEdit
      </div>}
      />
      <Route path={pages.custGroupReg} element={<div>
        custGroupReg
      </div>}
      />
      <Route path={pages.custSearch} element={<div>
        custSearch
      </div>}
      />

      <Route path={pages.projEdit} element={<div>
        projEdit
      </div>}
      />
      <Route path={pages.projReg} element={<div>
        projReg
      </div>}
      />

      <Route path={pages.projProspect} element={<div>
        projProspect
      </div>}
      />
      <Route path={pages.projProspectSearch} element={<div>
        projProspectSearch
      </div>}
      />

      <Route path={pages.projContractPreview} element={<div>
        projContractPreview
      </div>}
      />

    </Routes>
  );
};

export default ManualRouter;