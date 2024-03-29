import React from "react";
import StaffHomePage from "./StaffHomePage";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import LeaveStatus from "../staff/leaveStatus/LeaveStatus";

const MainStaffDashboard = ({ reuseAbleNavigation }) => {
  const [state, setState] = useState(true);
  const switchRoutes = () => {
    setState(!state);
    return;
  };
  return (
    <div>
      {state ? <StaffHomePage switchRoutes={switchRoutes} /> : <LeaveStatus />}
    </div>
  );
};

export default MainStaffDashboard;
