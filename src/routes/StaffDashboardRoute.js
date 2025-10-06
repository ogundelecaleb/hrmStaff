import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Settings from "../pages/staff/settings/Settings";
import StaffRoute from "./StaffRoute";
import Report from "../pages/staff/report/Report";
import Event from "../pages/staff/event/Event";
import Calender from "../pages/staff/calender/Calender";
import Navbar from "../components/Navbar";
import LeaveSecond from "../pages/staff/leave/LeaveSecond";
import LeaveCertificate from "../pages/staff/leave/LeaveCertificate";
import MainDashboard from "../pages/dashboards/MainStaffDashboard";
import EditProfile from "../pages/staff/settings/editprofile/EditProfile";
import SecondEditProfile from "../pages/staff/settings/editprofile/SecondEditProfile";
import ChangePassword from "../pages/staff/settings/changepassword/ChangePassword";
import ChangeEmail from "../pages/staff/settings/changeemail/ChangeEmail";
import EmailMessage from "../pages/staff/inbox/EmailMessage";
import StaffLeaveRoute from "./StaffLeaveRoute";
import StaffInboxRoute from "./StaffInboxRoute";
import PersonalRecord from "../pages/staff/personalrecord/PersonalRecord";
import Notification from "../pages/staff/notification/Notification";
import SpaDevRoute from "./SpaDevRoute";
import ResumptionOfLeave from "../pages/staff/leave/leaveresumption/ResumptionOfLeave";
import LeaveResumptionCertificate from "../pages/staff/leave/ResumptionCertificate";

const StaffDashboardRoute = ({ mobile, setMobile, display }) => {
  const navigate = useNavigate();

  const submitted = () => {
    navigate("success-submit");
  };

  const reuseableNavigation = (page) => {
    navigate(page);
    return;
  };

  return (
    <div className="w-full  text-dark">
      <Navbar
        mobile={mobile}
        setMobile={setMobile}
        display={display}
        reuseableNavigation={reuseableNavigation}
      />
      <Routes>
        <Route
          path="/dashboard"
          exact
          element={<MainDashboard reuseableNavigation={reuseableNavigation} />}
        />
        <Route
          path="/leave/*"
          element={<StaffLeaveRoute navigate={navigate} />}
        />
        <Route
          path="/leave-second"
          element={<LeaveSecond submitted={submitted} />}
        />
        <Route
          path="/promotion/*"
          element={<SpaDevRoute euseableNavigation={reuseableNavigation} />}
        />
        <Route
          path="/setting"
          element={<Settings reuseableNavigation={reuseableNavigation} />}
        />
        <Route
          path="/leave-certificate"
          element={<LeaveCertificate navigate={navigate} />}
        />

        <Route
          path="/leave-resumption-certificate"
          element={<LeaveResumptionCertificate navigate={navigate} />}
        />
        <Route
          path="/staff/*"
          element={<StaffRoute reuseableNavigation={reuseableNavigation} />}
        />
        <Route path="/report" element={<Report />} />
        <Route path="/event" element={<Event />} />
        <Route
          path="/notification"
          element={<Notification reuseableNavigation={reuseableNavigation} />}
        />
        <Route
          path="/inbox"
          element={
            <StaffInboxRoute reuseableNavigation={reuseableNavigation} />
          }
        />
        <Route path="/calender" element={<Calender />} />
        <Route
          path="/dashboard/personal-records"
          element={<PersonalRecord />}
        />
        <Route path="email-message" element={<EmailMessage />} />
        <Route
          path="/edit-profile"
          element={<EditProfile reuseableNavigation={reuseableNavigation} />}
        />
        <Route
          path="/second-edit-profile"
          element={
            <SecondEditProfile reuseableNavigation={reuseableNavigation} />
          }
        />
        <Route
          path="/change-password"
          element={<ChangePassword reuseableNavigation={reuseableNavigation} />}
        />
        <Route
          path="/change-email"
          element={<ChangeEmail reuseableNavigation={reuseableNavigation} />}
        />
      </Routes>
    </div>
  );
};

export default StaffDashboardRoute;
