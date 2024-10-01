import React from "react";
import StaffHomePage from "./StaffHomePage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import LeaveStatus from "../staff/leaveStatus/LeaveStatus";

const MainStaffDashboard = ({ reuseableNavigation }) => {
  const navigate = useNavigate();

  const [state, setState] = useState(true);
  const switchRoutes = () => {
    setState(!state);
    return;
  };
  return (
    <div>
      {state ? <StaffHomePage switchRoutes={switchRoutes} navigate={reuseableNavigation} /> : <LeaveStatus />}
    </div>
  );
};

export default MainStaffDashboard;
