import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Leave from "../pages/staff/leave/Leave";
import Submitted from "../components/submittedPage";
import LeaveSecond from "../pages/staff/leave/LeaveSecond";
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
import TrainingLeave from "../pages/staff/leave/TrainingLeave";
import ExaminationLeave from "../pages/staff/leave/ExamiationLeave";
import ApplicationOfGrants from "../pages/staff/leave/ApplicationOfGrants";
import BondOfAgreement from "../pages/staff/leave/BondOfAgreement";
import AdditionalInfo from "../pages/staff/leave/AdditionalInfo";
import TradeLeave from "../pages/staff/leave/TradeLeave";
import SportingLeave from "../pages/staff/leave/SportingLeave";
import ConferenceLeave from "../pages/staff/leave/ConferenceLeave";
import ShortTermStudyLeave from "../pages/staff/leave/ShortTermStudyLeave";
import StaffOnLeave from "../pages/hod/staff/leave/StaffOnLeave";
const HodLeaveRoute = () => {

  const navigation = useNavigate();

  const navigate = (page) => {
    navigation(page);
  };

  return (
    <div>
      <Routes>
        <Route path='/' element={<Leave navigate={navigate} />} />
        <Route
          path='annual-leave'
          element={<AnnualLeave navigate={navigate} />}
        />
         <Route
          path='annual-leave'
          element={<AnnualLeave navigate={navigate} />}
        />
       
        <Route
          path='compassionate-leave'
          element={<CompassionateLeave navigate={navigate} />}
        />
        <Route
          path='adoption-leave'
          element={<AdoptionLeave navigate={navigate} />}
        />
        <Route
          path='sick-leave'
          element={<SickLeave navigate={navigate} />}
        />
        <Route
          path='maternity-leave'
          element={<MaternityLeave navigate={navigate} />}
        />
        <Route
          path='additional-info'
          element={<AdditionalInfo navigate={navigate} />}
        />
        <Route
          path='paternity-leave'
          element={<PaternityLeave navigate={navigate} />}
        />
        <Route
          path='research-leave'
          element={<ResearchLeave navigate={navigate} />}
        />
        <Route
          path='sabbatical-leave'
          element={<SabbaticalLeave navigate={navigate} />}
        />
        <Route
          path='study-leave-with-pay'
          element={<StudyLeaveWithPay navigate={navigate} />}
        />
        <Route
          path='study-leave-without-pay'
          element={<StudyLeaveWithoutPay navigate={navigate} />}
        />
        <Route
          path='examination-leave'
          element={<ExaminationLeave navigate={navigate} />}
        />
        <Route
          path='sporting-leave'
          element={<SportingLeave navigate={navigate} />}
        />
        <Route
          path='short-term-study-leave-with-pay'
          element={<ShortTermStudyLeave navigate={navigate} />}
        />
        <Route
          path='conference-leave'
          element={<ConferenceLeave navigate={navigate} />}
        />
        <Route
          path='leave-for-trade-union'
          element={<TradeLeave navigate={navigate} />}
        />
        <Route
          path='training-leave'
          element={<TrainingLeave navigate={navigate} />}
        />
        <Route
          path='permission-to-be-away'
          element={<PermissiontobeAway navigate={navigate} />}
        />
        <Route
          path='application-of-grant'
          element={<ApplicationOfGrants navigate={navigate} />}
        />
        <Route
          path='leave-of-absence'
          element={<LeaveOfAbsense navigate={navigate} />}
        />
        <Route
          path='bond-of-agreement'
          element={<BondOfAgreement navigate={navigate} />}
        />
        {/* <Route
          path='resumption-of-leave'
          element={<ResumptionOfLeave navigate={navigate} />}
        /> */}
        <Route
          path='leave-second'
          element={<LeaveSecond navigate={navigate} />}
        />
        <Route path='submited' element={<Submitted navigate={navigate} />} />
      </Routes>
    </div>
  );
};

export default HodLeaveRoute;
