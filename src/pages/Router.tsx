import { Route, Routes } from 'react-router-dom';
import { FormikConstruction } from './projRegister';
import { FormikContractPreview } from './projContracts/preview';
import {  FormikIndividualCustomer } from './customer/register/FormikIndividualCustomer';
import { FormikCustomerSearch } from './customer/search';
import { FormikProjProspect } from './projProspect';
import UnderConstruction from './UnderConstruction';
import { FormikProjProspectSearch } from './projProspectSearch/FormikProjProspectSearch';



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

  projProspect: '/project/prospect/register',
  projProspectSearch: '/project/prospect/search',

  projContractPreview: '/project/contract/preview',


};



const Router = () => (


  <Routes>
    <Route path="/" element={<UnderConstruction />} />

    {/* 顧客グループ */}
    <Route path={`${pages.custGroupEdit}`} element={<FormikIndividualCustomer />} />
    <Route path={pages.custGroupReg} element={<FormikIndividualCustomer key={'register'} />} />
    <Route path={pages.custSearch} element={<FormikCustomerSearch />} />

    {/* 工事情報 */}
    <Route path={pages.projReg} element={<FormikConstruction />} key={'regConst'}/>
    <Route path={`${pages.projEdit}`} element={<FormikConstruction />} key={'edit'}/>


    {/* 見込み検索 */}
    <Route path={`${pages.projProspectSearch}`} element={<FormikProjProspectSearch />} key={'search'}/>

    {/* 見込み登録 */}
    <Route path={`${pages.projProspect}`} element={<FormikProjProspect />}   key={'edit'} />


    {/* 契約 */}
    <Route path={`${pages.projContractPreview}`} element={<FormikContractPreview />} />

  </Routes>

);

export default Router;
