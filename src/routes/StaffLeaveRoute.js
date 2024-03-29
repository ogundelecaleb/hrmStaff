import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Leave from "../pages/staff/leave/Leave";
import Submitted from "../components/submittedPage";
// import LeaveSecond from "../pages/staff/leave/LeaveSecond";
import AnnualLeave from "../pages/staff/leave/AnnualLeave";
import CasualLeave from "../pages/staff/leave/CasualLeave";
import CompassionateLeave from "../pages/staff/leave/CompassionateLeave";
import AdoptionLeave from "../pages/staff/leave/AdoptionLeave";
import LeaveOfAbsense from "../pages/staff/leave/LeaveOfAbsence";
import MaternityLeave from "../pages/staff/leave/MaternityLeave";
import PaternityLeave from "../pages/staff/leave/PaternityLeave";
import PermissiontobeAway from "../pages/staff/leave/PermissionToBeAway";
import ResearchLeave from "../pages/staff/leave/ResearchLeave";
// import ResumptionOfLeave from "../pages/staff/leave/ResumptionOfLeave";
import SabbaticalLeave from "../pages/staff/leave/SabbaticalLeave";
import SickLeave from "../pages/staff/leave/SickLeave";
import StudyLeaveWithPay from "../pages/staff/leave/StudyLeaveWithPay";
import StudyLeaveWithoutPay from "../pages/staff/leave/StudyLeaveWithoutPay";
import ExaminationLeave from "../pages/staff/leave/ExamiationLeave";
import TrainingLeave from "../pages/staff/leave/TrainingLeave";
import ApplicationOfGrants from "../pages/staff/leave/ApplicationOfGrants";
import BondOfAgreement from "../pages/staff/leave/BondOfAgreement";
import AdditionalInfo from "../pages/staff/leave/AdditionalInfo";
import LeaveApplicantions from "../pages/staff/leave/leaveApplications/LeaveApplicantions";
import LeaveApplicantDetails from "../pages/staff/leave/leaveApplications/LeaveApplicantDetails";
import TradeLeave from "../pages/staff/leave/TradeLeave";
import SportingLeave from "../pages/staff/leave/SportingLeave";
import ConferenceLeave from "../pages/staff/leave/ConferenceLeave";
import ShortTermStudyLeave from "../pages/staff/leave/ShortTermStudyLeave";
import LeaveAppointment from "../pages/staff/leave/LeaveAppointment";
import ResumptionOfLeaveApplication from "../pages/staff/leave/leaveresumption/ResumptionOfLeaveApplication";
import ResumptionOfLeave from "../pages/staff/leave/leaveresumption/ResumptionOfLeave";
import DutyResumptionDetails from "../pages/staff/leave/leaveresumption/DutyResumptionDetails";
import BereavementLeave from "../pages/staff/leave/BereavementLeave";     
const StaffLeaveRoute = () => {
  const navigation = useNavigate();
  const navigate = (page) => {
    navigation(page);
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<LeaveAppointment navigate={navigate} />} />
        <Route
          path="/my-leave-applications"
          element={<LeaveApplicantions navigate={navigate} />}
        />
        <Route
          path="/leave-resumption"
          element={<ResumptionOfLeaveApplication navigate={navigate} />}
        />
        <Route
          path="/my-leave-resumption"
          element={<ResumptionOfLeave navigate={navigate} />}
        />
        <Route
          path="/my-leave-resumption/resumption-details/:id"
          exact
          element={<DutyResumptionDetails />}
        />
        <Route
          path="/leave-application"
          element={<Leave navigate={navigate} />}
        />
        <Route
          path="my-leave-applications/leave-applicant-details/:id"
          element={<LeaveApplicantDetails navigate={navigate} />}
        />
        <Route
          path="leave-application/annual-leave"
          element={<AnnualLeave navigate={navigate} />}
        />
        <Route
          path="leave-application/casual-leave"
          element={<CasualLeave navigate={navigate} />}
        />
        <Route
          path="leave-application/compassionate-leave"
          element={<CompassionateLeave navigate={navigate} />}
        />
        <Route
          path="leave-application/adoption-leave"
          element={<AdoptionLeave navigate={navigate} />}
        />
        <Route
          path="leave-application/sick-leave"
          element={<SickLeave navigate={navigate} />}
        />
        <Route
          path="leave-application/maternity-leave"
          element={<MaternityLeave navigate={navigate} />}
        />
        <Route
          path="leave-application/additional-info"
          element={<AdditionalInfo navigate={navigate} />}
        />
        <Route
          path="leave-application/paternity-leave"
          element={<PaternityLeave navigate={navigate} />}
        />
        <Route
          path="leave-application/examination-leave"
          element={<ExaminationLeave navigate={navigate} />}
        />
        <Route
          path="leave-application/sporting-leave"
          element={<SportingLeave navigate={navigate} />}
        />
        <Route
          path="leave-application/conference-leave"
          element={<ConferenceLeave navigate={navigate} />}
        />
        <Route
          path="leave-application/short-term-study-leave-with-pay"
          element={<ShortTermStudyLeave navigate={navigate} />}
        />
        <Route
          path="leave-application/research-leave"
          element={<ResearchLeave navigate={navigate} />}
        />
        <Route
          path="leave-application/leave-for-trade-union"
          element={<TradeLeave navigate={navigate} />}
        />
        <Route
          path="leave-application/sabbatical-leave"
          element={<SabbaticalLeave navigate={navigate} />}
        />
        <Route
          path="leave-application/beareavement-leave"
          element={<BereavementLeave navigate={navigate} />}
        />
        <Route
          path="leave-application/study-leave-with-pay"
          element={<StudyLeaveWithPay navigate={navigate} />}
        />
        <Route
          path="leave-application/study-leave-without-pay"
          element={<StudyLeaveWithoutPay navigate={navigate} />}
        />
        <Route
          path="leave-application/training-leave"
          element={<TrainingLeave navigate={navigate} />}
        />
        <Route
          path="leave-application/permission-to-be-away"
          element={<PermissiontobeAway navigate={navigate} />}
        />
        <Route
          path="leave-application/application-of-grant"
          element={<ApplicationOfGrants navigate={navigate} />}
        />
        <Route
          path="leave-application/leave-of-absence"
          element={<LeaveOfAbsense navigate={navigate} />}
        />
        <Route
          path="leave-application/bond-of-agreement"
          element={<BondOfAgreement navigate={navigate} />}
        />
        {/* <Route
          path='leave-application/resumption-of-leave'
          element={<ResumptionOfLeave navigate={navigate} />}
        /> */}
        {/* <Route
          path='leave-second'
          element={<LeaveSecond navigate={navigate} />}
        /> */}
        <Route path="submited" element={<Submitted navigate={navigate} />} />
      </Routes>
    </div>
  );
};

export default StaffLeaveRoute;
