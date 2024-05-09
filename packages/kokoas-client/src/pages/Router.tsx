import { Route, Routes } from 'react-router-dom';
//import { FormikConstruction } from './projRegister/FormikConstruction';
//import { FormikIndividualCustomer } from './customer/register/FormikIndividualCustomer';
//import { FormikProjProspect } from './projProspect';
//import { FormikProjProspectSearch } from './projProspectSearch/FormikProjProspectSearch';
import { SettingsPage } from './settingsPage/SettingsPage';
//import { FormikInvoice } from './projInvoice/FormikInvoice';
import { Home } from './@home/Home';
import { memo } from 'react';
import { FormContractSearch } from './projContractSearchV2/FormContractSearch';
//import { UnderDevelopment } from './UnderDevelopment';
import { FormContract } from './projContractV2/FormContract';
import { FormProject } from './projRegisterV2/FormProject';
import { FormProjectSearch } from './projSearch/FormProjectSearch';
import { FormProjEstimate } from './projEstimate/FormProjEstimate';
import { FormCustGroup } from './custGroup/FormCustGroup';
import { FormProspectSearch } from './projProspectSearchV2/FormProspectSearch';
import { FormOrder } from './order/FormOrder';
import { FormOrderInvoice } from './orderInvoice/FormOrderInvoice';



// The Main component renders one of the provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

// RouteMatch, useParams : TS access to dynamic route

export const pages = {
  //custGroupReg: '/custgroup/register',
  //custGroupEdit: '/custgroup/edit',

  custGroupEditV2: '/custgroup/edit/v2',

  custSearch: '/customer/search',

  //projEdit: '/project/edit',
  //projReg: '/project/register',

  projEditV2: '/project/edit/v2',

  projEstimate: '/project/estimate/register',
  projSearch: '/project/search',

  //projProspect: '/project/prospect/register',
  projProspectSearch: '/project/prospect/search',

  /** 旧契約 */
  projContractPreview: '/project/contract/preview',
  projContractSearch: 'project/contract/search',

  /** 新契約 */
  projContractPreviewV2: '/project/contract/preview/v2',

  /** 発注 BtoB */
  projOrderInput: '/project/order/input',
  projOrderInvoiceSearch: '/project/order/invoicesearch',

  /** BtoC */
  projInvoice: '/project/payment/invoice',
  projPaymentSearch: '/project/payment/search',
  projPaymentInput: '/project/payment/input',

  settings: '/settings',

};



const Router = () => (


  <Routes>
    <Route path="/" element={<Home />} />
    {/* 一覧 */}
    <Route path={`${pages.projSearch}`} element={<FormProjectSearch />} />

    {/* 顧客グループ */}
    {/* <Route path={`${pages.custGroupEdit}`} element={<FormikIndividualCustomer />} /> */}
    {/* <Route path={pages.custGroupReg} element={<FormikIndividualCustomer key={'register'} />} /> */}
    
    {/* 顧客グループV2 */}
    <Route path={`${pages.custGroupEditV2}`} element={<FormCustGroup />} />
    {/*  <Route path={pages.custSearch} element={<FormikCustomerSearch />} /> */}

    {/* 工事情報 */}
    {/* <Route path={pages.projReg} element={<FormikConstruction />} key={'regConst'} /> */}
    {/* <Route path={`${pages.projEdit}`} element={<FormikConstruction />} key={'edit'} /> */}
    <Route path={`${pages.projEditV2}`} element={<FormProject />} />


    {/* 見込み検索 */}
    <Route path={`${pages.projProspectSearch}`} element={<FormProspectSearch />} key={'search'} />

    {/* 見込み登録 */}
    {/* <Route path={`${pages.projProspect}`} element={<FormikProjProspect />} key={'edit'} /> */}

    <Route path={`${pages.projEstimate}`} element={<FormProjEstimate />} />


    {/* 契約一覧 */}
    <Route path={`${pages.projContractSearch}`} element={<FormContractSearch />} />

    {/* 新契約 */}
    <Route path={`${pages.projContractPreviewV2}`} element={<FormContract />} />

    {/* 発注 BtoB */}
    <Route path={pages.projOrderInput} element={<FormOrder />} />
    <Route path={pages.projOrderInvoiceSearch} element={<FormOrderInvoice />} />


    {/* 入金管理グループ */}
    {/* <Route path={`${pages.projInvoice}`} element={<FormikInvoice />} /> */}
    {/* <Route path={`${pages.projPaymentSearch}`} element={<UnderDevelopment />} /> */}
    {/* <Route path={`${pages.projPaymentInput}`} element={<UnderDevelopment />} /> */}

    {/* 設定 */}
    <Route path={`${pages.settings}/*`} element={<SettingsPage />} />


  </Routes>

);

export default memo(Router);
