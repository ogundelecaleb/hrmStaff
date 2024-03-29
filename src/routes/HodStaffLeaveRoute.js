import React from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import AdoptionDetails from '../pages/hod/staff/leave/applicatant-details/AdoptionDetails';
import AnnualDetails from '../pages/hod/staff/leave/applicatant-details/AnnualDetails';
import { CasualDetails } from '../pages/hod/staff//leave/applicatant-details/CasualDetails';
import { CompassionateDetails } from '../pages/hod/staff/leave/applicatant-details/CompassionateDetails';
import { LeaveOfAbsenceDetails } from '../pages/hod/staff/leave/applicatant-details/LeaveOfAbsenceDetails';
import { MaternityDetails } from '../pages/hod/staff/leave/applicatant-details/MaternityDetails';
import { PaternityDetails } from '../pages/hod/staff/leave/applicatant-details/PaternityDetails';
import { PermissiontobeAwayDetails } from '../pages/hod/staff/leave/applicatant-details/PermissiontobeAwayDetails';
import { SabbaticalDetails } from '../pages/hod/staff/leave/applicatant-details/SabbaticalDetails';
import { ResearchDetails } from '../pages/hod/staff/leave/applicatant-details/ResearchDetails';
import { SickDetails } from '../pages/hod/staff/leave/applicatant-details/SickDetails';
import { StudyWithPayDetails } from '../pages/hod/staff/leave/applicatant-details/StudyWithPayDetails';
import { TrainingDetails } from '../pages/hod/staff/leave/applicatant-details/TrainingDetails';
import {ConferenceDetails} from '../pages/hod/staff/leave/applicatant-details/ConferenceDetails'
import {ExaminationDetails} from '../pages/hod/staff/leave/applicatant-details/ExaminationDetails'
import {ShortTermStudyLeaveDetails} from '../pages/hod/staff/leave/applicatant-details/ShortTermStudyLeaveDetails'
import {SportingDetails} from '../pages/hod/staff/leave/applicatant-details/SportingDetails'
import {StudyWithoutPayDetails} from '../pages/hod/staff/leave/applicatant-details/StudyWithoutPayDetails'
import {TradeLeaveDetails} from '../pages/hod/staff/leave/applicatant-details/TradeLeaveDetails'
import { BereavementDetails } from '../pages/hod/staff/leave/applicatant-details/BereavementDetails';

const HodStaffLeaveRoute = () => {

  const navigate = useNavigate();

  const reuseableNavigation = (page) => {
    navigate(page);
    return;
  };

  return (

    <Routes>
      <Route path='adoption-leave/details/:id' element={<AdoptionDetails/>}/>
      <Route path='annual-leave/details/:id' element={<AnnualDetails />}/>
      <Route path='casual-leave/details/:id' element={<CasualDetails />}/>
      <Route path='compassionate-leave/details/:id' element={<CompassionateDetails />}/>
      <Route path='leave-of-absence/details/:id' element={<LeaveOfAbsenceDetails />}/> 
      <Route path='maternity-leave/details/:id' element={<MaternityDetails />}/>
      <Route path='paternity-leave/details/:id' element={<PaternityDetails />}/>
      <Route path='permission-to-be-away/details/:id' element={<PermissiontobeAwayDetails/>}/>
      <Route path='research-leave/details/:id' element={<ResearchDetails/>}/>
      <Route path='sabbatical-leave/details/:id' element={<SabbaticalDetails/>}/>
      <Route path='sick-leave/details/:id' element={<SickDetails />}/>
      <Route path='study-leave-with-pay/details/:id' element={<StudyWithPayDetails/>}/>
      <Route path='training-leave/details/:id' element={<TrainingDetails />}/>
      <Route path='conference-leave/details/:id' element={<ConferenceDetails/>}/>
      <Route path='examination-leave/details/:id' element={<ExaminationDetails/>}/>
      <Route path='short-term-study-leave-with-pay/details/:id' element={<ShortTermStudyLeaveDetails/>}/>
      <Route path='sporting-leave/details/:id' element={<SportingDetails/>}/>
      <Route path='study-leave-without-pay/details/:id' element={<StudyWithoutPayDetails/>}/>
      <Route path='leave-for-trade/details/:id' element={<TradeLeaveDetails/>}/>
      <Route path='bereavement-leave/details/:id' element={<TradeLeaveDetails/>}/>
    </Routes>

  )
}

export default HodStaffLeaveRoute