import { Route, Routes } from 'react-router-dom';
import { FormikConstruction } from './projRegister/FormikConstruction';
import { FormikContract } from './projContracts/';
import {  FormikIndividualCustomer } from './customer/register/FormikIndividualCustomer';
import { FormikCustomerSearch } from './customer/search';
import { FormikProjProspect } from './projProspect';
import UnderConstruction from './UnderConstruction';
import { FormikProjProspectSearch } from './projProspectSearch/FormikProjProspectSearch';
import { FormikProjEstimate } from './projEstimate/FormikProjEstimate';
import { SettingsPage } from './settingsPage/SettingsPage';
import { FormikContractSearch } from './projContractSearch/FormikContractSearch';
import { FormikInvoice } from './projInvoice/FormikInvoice';



// The Main component renders one of the provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

// RouteMatch, useParams : TS access to dynamic route

export const pages = {
  custGroupReg: '/custgroup/register',
  custGroupEdit: '/custgroup/edit',
  custSearch: '/customer/search',

  projEdit: '/project/edit',
  projReg: '/project/register',

  projEstimate: '/project/estimate/register',

  projProspect: '/project/prospect/register',
  projProspectSearch: '/project/prospect/search',

  projContractPreview: '/project/contract/preview',
  projContractSearch: 'project/contract/search',

  projInvoice: '/project/payment/invoice',
  projPaymentSearch: '/project/payment/search',
  projPaymentInput: '/project/payment/input',

  settings: '/settings',

};



const Router = () => (


  <Routes>
    <Route path="/" element={<UnderConstruction />} />

    {/* 顧客グループ */}
    <Route path={`${pages.custGroupEdit}`} element={<FormikIndividualCustomer />} />
    <Route path={pages.custGroupReg} element={<FormikIndividualCustomer key={'register'} />} />
    <Route path={pages.custSearch} element={<FormikCustomerSearch />} />

    {/* 工事情報 */}
    <Route path={pages.projReg} element={<FormikConstruction />} key={'regConst'} />
    <Route path={`${pages.projEdit}`} element={<FormikConstruction />} key={'edit'} />


    {/* 見込み検索 */}
    <Route path={`${pages.projProspectSearch}`} element={<FormikProjProspectSearch />} key={'search'} />

    {/* 見込み登録 */}
    <Route path={`${pages.projProspect}`} element={<FormikProjProspect />} key={'edit'} />

    {/* 見積もり登録 */}
    <Route path={`${pages.projEstimate}`} element={<FormikProjEstimate />} />

    {/* 契約 */}
    <Route path={`${pages.projContractPreview}`} element={<FormikContract />} />
    {/* 契約一覧 */}
    <Route path={`${pages.projContractSearch}`} element={<FormikContractSearch />} />

    {/* 入金管理グループ */}
    <Route path={`${pages.projInvoice}`} element={<FormikInvoice />} />
    <Route path={`${pages.projPaymentSearch}`} element={'入金予定一覧ページ：未対応'} />
    <Route path={`${pages.projPaymentInput}`} element={'入金情報入力ページ：未対応'} />

    {/* 設定 */}
    <Route path={`${pages.settings}/*`} element={<SettingsPage />} />


  </Routes>

);

export default Router;
