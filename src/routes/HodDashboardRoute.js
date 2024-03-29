import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Submitted from "../components/submittedPage";
import Settings from "../pages/staff/settings/Settings";
import HodStaffRoute from "../routes/HodStaffRoute";
import HodManageStaffRoute from "../routes/HodManageStaffRoute";
import Report from "../pages/staff/report/Report";
import Event from "../pages/staff/event/Event";
import Calender from "../pages/staff/calender/Calender";
import Navbar from "../components/Navbar";
import JobApplicantsRoutes from "./JobApplicantsRoutes";
import MainDashboard from "../pages/dashboards/MainStaffDashboard";
import EditProfile from "../pages/staff/settings/editprofile/EditProfile";
import SecondEditProfile from "../pages/staff/settings/editprofile/SecondEditProfile";
import ChangePassword from "../pages/staff/settings/changepassword/ChangePassword";
import ChangeEmail from "../pages/staff/settings/changeemail/ChangeEmail";
import EmailMessage from "../pages/staff/inbox/EmailMessage";
import Leave from "../pages/hod/staff/leave/Leave";
import HodStaffLeaveRoute from "./HodStaffLeaveRoute";
import HodLeaveRoute from "./HodLeaveRoute";
import Staff from '../pages/hod/staff/Staff';
import JobOpening from '../pages/hod/jobpenings/JobOpening';
import PersonalRecord from "../pages/staff/personalrecord/PersonalRecord";
import Inbox from "../pages/staff/inbox/Inbox";
import { Notification } from "../pages/hod/notification/Notification";
import HodSpaDevRoute from "./HodSpaDevRoute";

const HodDashboardRoute = ({ mobile, setMobile, display }) => {

  const navigate = useNavigate();

  const submitted = () => {
    navigate("submitted");
  };

  const reuseableNavigation = (page) => {
    navigate(page);
    return;
  };

  return (
    <div className='rightBody  text-dark'>
      <Navbar
        mobile={mobile}
        setMobile={setMobile}
        display={display}
        reuseableNavigation={reuseableNavigation}
      />
      <Routes>
        <Route path='/' exact element={<MainDashboard />} />
        <Route path='/dashboard' exact element={<MainDashboard />} />
        <Route path='/leave' exact element={<Leave />} />
        <Route
          path='/leave-application/*'
          element={<HodLeaveRoute reuseableNavigation={reuseableNavigation} />}
        />
        <Route path='/leave/*' exact element={<HodStaffLeaveRoute reuseableNavigation={reuseableNavigation}/>} />
        <Route path='/job-applicants/*'
          exact
          element={<JobApplicantsRoutes />}
        />
        <Route
          path='/job-openings'
          element={<JobOpening reuseableNavigation={reuseableNavigation} />}
        />
        <Route
          path='/spadev/*'
          element={<HodSpaDevRoute submitted={submitted} />}
        />

        {/* <Route path='personal-records' element={<PersonalRecord />} /> */}
        <Route path='dashboard/personal-records' element={<PersonalRecord />} />
        <Route
          path='/setting'
          element={<Settings reuseableNavigation={reuseableNavigation} />}
        />
        <Route path='/staff' exact element={<Staff/>} />
        <Route path='/staff/*' exact element={<HodStaffRoute reuseableNavigation={reuseableNavigation}/>} />
        <Route path='/manage-staff/*' exact element={<HodManageStaffRoute reuseableNavigation={reuseableNavigation}/>} />
        <Route path='/report' element={<Report />} />
        <Route path='/event' element={<Event />} />
        {/* <Route Path='manage-staff/personal-records/:id' element={<PersonalRecord />} /> */}
        <Route
          path='/inbox'
          element={
            <Inbox reuseableNavigation={reuseableNavigation} />
          }
        />
          <Route
          path='/notification'
          element={
            <Notification reuseableNavigation={reuseableNavigation} />
          }
        />
        <Route path='/calender' element={<Calender />} />
        <Route path='email-message' element={<EmailMessage />} />
        <Route
          path='/edit-profile'
          element={<EditProfile reuseableNavigation={reuseableNavigation} />}
        />
        <Route
          path='/second-edit-profile'
          element={
            <SecondEditProfile reuseableNavigation={reuseableNavigation} />
          }
        />
        <Route
          path='/change-password'
          element={<ChangePassword reuseableNavigation={reuseableNavigation} />}
        />
        <Route
          path='/change-email'
          element={<ChangeEmail reuseableNavigation={reuseableNavigation} />}
        />
      </Routes >
    </div >
  );
};

export default HodDashboardRoute;
