import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Submitted from "../components/submittedPage";
import SpadevJunior from "../pages/staff/spadev/SpadevJunior"
import SpadevSenior from "../pages/staff/spadev/SpadevSenior"
import SpadevApplication from "../pages/staff/spadev/SpadevApplication";
import SpadevApplications from "../pages/staff/staff/all-applications/SpadevApplications";
import SpaDevApplicationDetails from "../pages/staff/staff/staff-appointment/all-application-details/SpaDevApplicationDetails";
const SpaDevRoute = () => {

  const navigation = useNavigate();
  const navigate = (page) => {
    navigation(page);
  };
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<SpadevApplications navigate={navigate} />} />
        <Route path='/spadev-applications-details/:id' element={<SpaDevApplicationDetails navigate={navigate} />} />
        <Route path='/spadev-application' element={<SpadevApplication navigate={navigate} />} />
        <Route path='/spadev-application/spadev-junior' element={<SpadevJunior navigate={navigate} />} />
        <Route path='/spadev-application/spadev-senior' element={<SpadevSenior navigate={navigate} />} />
        <Route path='/spadev-application/spadev-senior/submitted' element={<Submitted navigate={navigate} />}/>
        <Route path='/spadev-application/spadev-junior/submitted' element={<Submitted navigate={navigate} />}/>
      </Routes>
    </div>
  );
};

export default SpaDevRoute;
