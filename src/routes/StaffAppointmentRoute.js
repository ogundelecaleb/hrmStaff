import AppointmentRequest from "../pages/staff/staff/staff-appointment/appointment/AppointmentRequest";
import { Route, Routes, useNavigate } from "react-router-dom";
import PermanentJunior from "../pages/staff/staff/staff-appointment/appointment/permanent/junior";
import CasualJunior from "../pages/staff/staff/staff-appointment/appointment/casual/junior";
import PermanentSenior from "../pages/staff/staff/staff-appointment/appointment/permanent/senior";
import CasualSenior from "../pages/staff/staff/staff-appointment/appointment/casual/senior";
import TemporarySenior from "../pages/staff/staff/staff-appointment/appointment/temporary/senior";
import TemporaryJunior from "../pages/staff/staff/staff-appointment/appointment/temporary/junior";
import ContractJunior from "../pages/staff/staff/staff-appointment/appointment/contract/junior";
import ContractSenior from "../pages/staff/staff/staff-appointment/appointment/contract/senior";
import Submitted from "../components/submittedPage";

const StaffAppointmentRoute = ({ reuseableNavigation }) => {
  const navigation = useNavigate();
  const navigate = (page) => {
    navigation(page);
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<AppointmentRequest navigate={navigate} />} />
        <Route
          path='/permanent-junior'
          element={<PermanentJunior navigate={navigate} />}
        />
          <Route
          path='/permanent-senior'
          element={<PermanentSenior navigate={navigate} />}
        />
       
         <Route
          path='/temporary-senior'
          element={<TemporarySenior navigate={navigate} />}
        />
         <Route
          path='/temporary-junior'
          element={<TemporaryJunior navigate={navigate} />}
        />
         <Route
          path='/contract-junior'
          element={<ContractJunior navigate={navigate} />}
        />
         <Route
          path='/contract-senior'
          element={<ContractSenior navigate={navigate} />}
        />
         <Route
          path='/casual-senior'
          element={<CasualSenior navigate={navigate} />}
        />
         <Route
          path='/casual-junior'
          element={<CasualJunior navigate={navigate} />}
        />
         <Route
          path='success-submit'
          element={<Submitted navigate={navigate} />}
        />
      </Routes>
    </>
  );
};

export default StaffAppointmentRoute;
