import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Submitted from "../components/submittedPage";
import SpadevJunior from "../pages/staff/spadev/SpadevJunior"
import SpadevSenior from "../pages/staff/spadev/SpadevSenior"
import Promotion from "../pages/staff/spadev/SpadevApplication";
import SpaDevApplication from "../pages/hod/staff/appointments/SpaDevApplication";
import SpaDevApplicationDetails from "../pages/hod/staff/appointments/applicantdetails/SpaDevApplicationDetails";
const HodSpaDevRoute = () => {
  const navigation = useNavigate();
  const navigate = (page) => {
    navigation(page);
  };
  return (
    <div>
      <Routes>
        
        <Route path='/' element={<SpaDevApplication navigate={navigate} />} />
        <Route path='/spadev-applications-details/:id' element={<SpaDevApplicationDetails navigate={navigate} />} />
        <Route path='/application' element={<Promotion navigate={navigate} />} />
        <Route path='/application/spadev-junior' element={<SpadevJunior navigate={navigate} />} />
        <Route path='/application/spadev-senior' element={<SpadevSenior navigate={navigate} />} />
        <Route path='/application/spadev-senior/submitted' element={<Submitted navigate={navigate} />}/>
        <Route path='/application/spadev-junior/submitted' element={<Submitted navigate={navigate} />}/>
      </Routes>
    </div>
  );
};

export default HodSpaDevRoute;
