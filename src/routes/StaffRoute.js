import StaffAppointment from "../pages/staff/staff/staff-appointment/StaffAppointment";
import AppointmentRequest from "../pages/staff/staff/staff-appointment/appointment/AppointmentRequest";
import { Route, Routes, useNavigate } from "react-router-dom";
import AppointmentRegularization from "../pages/staff/staff/staff-appointment/regularizationOfAppointment/AppointmentRegularization";
import ConfirmationOfAppointment from "../pages/staff/staff/staff-appointment/confirmation-of-appointment/ConfirmationOfAppointment";
import WithdrawalFirstpage from "../pages/staff/staff/staff-appointment/withdrawal-of-appointment/WithdrawalFirstpage";
import WithdrawalSecondPage from "../pages/staff/staff/staff-appointment/withdrawal-of-appointment/WithdrawalSecondPage";
import Submitted from "../components/submittedPage";
import StaffApplicationRoute from "./StaffApplicationRoute";
import ResumptionOfLeave from "../pages/staff/staff/staff-appointment/resumptionOfLeave/ResumptionOfLeave";
import AllApplications from "../pages/staff/staff/all-applications/AllApplications";
import AppointmentConfirmationCertificate from "../pages/staff/staff/staff-appointment/AppointmentConfirmationCertificate";
import AppointmentRegularizationCertificate from "../pages/staff/staff/staff-appointment/AppointmentRegularizationCertificate";

const StaffRoute = () => {
  const navigation = useNavigate();
  const navigate = (page) => {
    navigation(page);
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<StaffAppointment navigate={navigate} />} />
        <Route
          path='all-applications'
          element={<AllApplications navigate={navigate} />}
        />
        <Route
          path='all-applications/*'
          element={<StaffApplicationRoute navigate={navigate} />}
        />
        <Route
          path='resumption-of-leave'
          element={<ResumptionOfLeave navigate={navigate} />}
        />
        <Route
          path='resumption-of-leave/success-submit'
          element={<Submitted navigate={navigate} />}
        />
        <Route
          path='appointment-request'
          element={<AppointmentRequest navigate={navigate} />}
        />
        <Route
          path='appointment-request/success-submit'
          element={<Submitted navigate={navigate} />}
        />
        <Route
          path='withdrawal'
          element={<WithdrawalFirstpage navigate={navigate} />}
        />
        <Route
          path='confirmation-of-appointment'
          element={<ConfirmationOfAppointment navigate={navigate} />}
        />
        <Route
          path='confirmation-of-appointment/success-submit'
          element={<Submitted navigate={navigate} />}
        />
         <Route
          path='appointment-confirmation-certificate'
          element={<AppointmentConfirmationCertificate navigate={navigate} />}
        />
         <Route
          path='appointment-regularization-certificate'
          element={<AppointmentRegularizationCertificate navigate={navigate} />}
        />
        <Route
          path='withdrawal/withdrawal-second-page'
          element={<WithdrawalSecondPage navigate={navigate} />}
        />
        <Route
          path='withdrawal/withdrawal-second-page/success-submit'
          element={<Submitted navigate={navigate} />}
        />
        
        <Route
          path='appointment-regularization'
          element={<AppointmentRegularization navigate={navigate} />}
        />
        <Route
          path='appointment-regularization/success-submit'
          element={<Submitted navigate={navigate} />}
        />
      </Routes>
    </>
  );
};

export default StaffRoute;
