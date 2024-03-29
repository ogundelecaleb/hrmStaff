import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AppointmentRegularizationDetails from "../pages/staff/staff/staff-appointment/all-application-details/AppointmentRegularizationDetails";
import AppointmentConfirmationDetails from "../pages/staff/staff/staff-appointment/all-application-details/AppointmentConfirmationDetails";
import AppointmentWithdrawalDetail from "../pages/staff/staff/staff-appointment/all-application-details/AppointmentWithdrawalDetail";
import DutyAssumptionDetail from "../pages/staff/staff/staff-appointment/all-application-details/DutyAssumptionDetail";
import SpaDevApplicationDetails from "../pages/staff/staff/staff-appointment/all-application-details/SpaDevApplicationDetails";

const StaffApplicationRoute = () => {

  const navigation = useNavigate();

  const navigate = (page) => {
    navigation(page);
  };

  return (
    <div>
      <Routes>
        <Route path='spadev-applications-details/:id' element={<SpaDevApplicationDetails />} />
        <Route path='regularization-details/:id' element={<AppointmentRegularizationDetails  />} />
        <Route path='confirmation-details/:id' element={<AppointmentConfirmationDetails />} />
        <Route path='withdrawal-details/:id' element={<AppointmentWithdrawalDetail  />} />
        <Route path='assumption-details/:id' element={<DutyAssumptionDetail />} />
      </Routes>
    </div>
  );
};

export default StaffApplicationRoute;
