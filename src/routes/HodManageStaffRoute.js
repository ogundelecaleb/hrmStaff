import React from 'react';
import { Route, Routes } from "react-router-dom";
// import AddStaff from '../pages/hod/staff/AddStaff';
import StaffList from '../pages/hod/staff/StaffList';
// import EditStaff from '../pages/hod/staff/EditStaff';
import PersonalRecord from '../pages/hod/staff/personalrecord/PersonalRecord';

function HodManageStaffRoute() {
  return ( 
    <Routes>
      <Route path='/' element={<StaffList />} />
      {/* <Route path='add-staff' element={<AddStaff />} /> */}
      {/* <Route path='edit-staff' element={<EditStaff />} /> */}
      <Route path='/personal-records/:id' element={<PersonalRecord />} />
    </Routes>
  )
}

export default HodManageStaffRoute;