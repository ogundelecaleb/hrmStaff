import React from "react";
import { Route, Routes } from "react-router-dom";

import AssumptionOfDuty from "../pages/hod/staff/appointments/AssumptionOfDuty";
import DutyAssumptionDetail from "../pages/hod/staff/appointments/applicantdetails/DutyAssumptionDetail";
import AppointmentRequest from "../pages/staff/staff/staff-appointment/appointment/AppointmentRequest";

import Submitted from "../components/submittedPage";

import WithdrawalFirstpage from "../pages/staff/staff/staff-appointment/withdrawal-of-appointment/WithdrawalFirstpage";
import WithdrawalSecondPage from "../pages/staff/staff/staff-appointment/withdrawal-of-appointment/WithdrawalSecondPage";
import AppointmentWithdrawal from "../pages/hod/staff/appointments/AppointmentWithdrawal";
import AppointmentWithdrawalDetail from "../pages/hod/staff/appointments/applicantdetails/AppointmentWithdrawalDetail";

import AppointmentRegularization from "../pages/staff/staff/staff-appointment/regularizationOfAppointment/AppointmentRegularization";
import RegularizationApplications from "../pages/hod/staff/appointments/AppointmentRegularization";
import AppointmentRegularizationDetails from "../pages/hod/staff/appointments/applicantdetails/AppointmentRegularizationDetails";

import AppointmentConfirmation from "../pages/hod/staff/appointments/AppointmentConfirmation";
import AppointmentDetails from "../pages/hod/staff/appointments/applicantdetails/AppointmentConfirmationDetails";
import ConfirmationOfAppointment from "../pages/staff/staff/staff-appointment/confirmation-of-appointment/ConfirmationOfAppointment";
const HodStaffRoute = () => {
  
  return (
    <Routes>

      <Route path='assumption-of-Duty' element={<AssumptionOfDuty />} />
      <Route path='assumption-of-Duty/assumption-details/:id' element={<DutyAssumptionDetail />} />
      <Route path='assumption-of-Duty/appointment-request' element={<AppointmentRequest />} />
      <Route path='assumption-of-Duty/appointment-request/success-submit' element={<Submitted />} />

      <Route path='withdrawal-appointments' element={<AppointmentWithdrawal />} />
      <Route path='withdrawal-appointments/withdrawal-details/:id' element={<AppointmentWithdrawalDetail />} />
      <Route path='withdrawal-appointments/withdrawal-request' element={<WithdrawalFirstpage />} />
      <Route path='withdrawal-appointments/withdrawal-request/withdrawal-second-page' element={< WithdrawalSecondPage />} />
      <Route path='withdrawal-appointments/withdrawal-request/withdrawal-second-page/success-submit' element={<Submitted />} />

      <Route path='temporary-regularized-appointment' element={<RegularizationApplications />} />
      <Route path='temporary-regularized-appointment/regularization-details/:id' element={<AppointmentRegularizationDetails/>} />
      <Route path='temporary-regularized-appointment/appointment-regularization' element={<AppointmentRegularization />} />
      <Route path='temporary-regularized-appointment/appointment-regularization/success-submit' element={<Submitted />} />

      <Route path='confirmed-appointments' element={<AppointmentConfirmation/>} />
      <Route path='confirmed-appointments/confirmation-details/:id' element={<AppointmentDetails />} />
      <Route path='confirmed-appointments/confirmation-application' element={<ConfirmationOfAppointment />} />
      <Route path='confirmed-appointments/confirmation-application/success-submit' element={<Submitted />} />

    </Routes>
  );
};

export default HodStaffRoute;
