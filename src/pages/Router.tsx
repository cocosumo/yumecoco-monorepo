import { Route, Routes } from 'react-router-dom';
import { FormikConstruction } from './construction';
import {  FormikIndividualCustomer } from './customer/register/FormikIndividualCustomer';
import { FormikCustomerSearch } from './customer/search';
import UnderConstruction from './UnderConstruction';



// The Main component renders one of the provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

// RouteMatch, useParams : TS access to dynamic route



const Router = () => (
  
  <Routes>
    <Route path="/" element={<UnderConstruction />} />
    <Route path="/construction/register" element={<FormikConstruction/>} key={'register'}/>
    <Route path="/construction/edit/:constructionId/" element={<FormikConstruction/>} />
    <Route path="/customer/search" element={<FormikCustomerSearch />} />
    <Route path="/custgroup/register" element={<FormikIndividualCustomer key={'register'} />} />
    {/* <Route path="/custgroup/edit/:groupId/" element={<CustomerRegistration />} /> */}
  </Routes>

);

export default Router;
