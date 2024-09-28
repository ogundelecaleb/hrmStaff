import React from "react";
import "../dasLeftNav.css";
import schLogo from "../../asset/logo(small).svg";
import {
  MdDashboard,
  MdMoveToInbox,
  MdAccountTree,
  MdSupervisedUserCircle,
} from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import { GiMatterStates, GiTeamUpgrade } from "react-icons/gi";
import { RiBubbleChartFill } from "react-icons/ri";
import { MdInsertChart } from "react-icons/md";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { IoTimerSharp, IoSettings, IoTimer } from "react-icons/io5";
import { BsInboxes } from "react-icons/bs";

import LogoutModal from "../../pages/hod/logout/Logout";

const HodLeftNavbar = ({ mobile, setMobile, display, staffNumber }) => {
  const [staffDropDown, setStaffDropDown] = useState(false);
  const [leaveDropDown, setLeaveDropDown] = useState(false);

  const dash1Style = { flexDirection: "column" };

  const handleCloseSidebar = () => {
    if (display === true) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  return (
    // <div className={mobile ? "leftNav pb-5" : "swapLeftNav"}>
    <div className={mobile ? "hide" : "swapLeftNav"}>
      <div
        onClick={() => setMobile(true)}
        style={dash1Style}
        className="d-flex over-class gap-2 ps-2 pt-3"
      >
        <div className="d-flex justify-content-center pe-3 pb-2">
          <img src={schLogo} alt="schhol_image" />
        </div>
        <div className="overflow-auto">
        <CustomLink to="dashboard">
          <div
            id="hoverEffect"
            className="ps-3 ms-1 d-flex align-items-center rounded gap-2"
            style={{ height: "48px", width: "90%" }}
          >
            <MdDashboard size="25" style={{ color: "#84818A" }} />
            Dashboard
          </div>
        </CustomLink>
        <CustomLink to="calender">
          <div
            id="hoverEffect"
            className="d-flex ps-3 ms-1 align-items-center rounded gap-2"
            style={{ height: "48px", width: "90%" }}
          >
            <IoMdCalendar size="25" style={{ color: "#84818A" }} />
            Calender & Schedule
          </div>
        </CustomLink>
        <CustomLink to="inbox">
          <div
            id="hoverEffect"
            className="ps-3 ms-1 d-flex align-items-center rounded gap-2"
            style={{ height: "48px", width: "90%" }}
          >
            <MdMoveToInbox size="25" style={{ color: "#84818A" }} />
            Inbox
          </div>
        </CustomLink>
        <CustomLink to="event">
          <div
            id="hoverEffect"
            className="ps-3 ms-1 d-flex align-items-center rounded gap-2"
            style={{ height: "48px", width: "90%" }}
          >
            <RiBubbleChartFill size="25" style={{ color: "#84818A" }} />
            Events/Training
          </div>
        </CustomLink>
        <p className="text-muted ms-4 mt-2" style={{ marginBottom: "-2px" }}>
          Recruitments
        </p>
        {/* <CustomLink to='job-openings'>
          <div
            id='hoverEffect'
            className='ps-3 ms-1 d-flex align-items-center rounded gap-2'
            style={{ height: "48px", width: "90%" }}>
            <MdAccountTree size='25' style={{ color: "#84818A" }} />
            Job Openings
          </div>
        </CustomLink> */}
        <CustomLink to="job-applicants">
          <div
            id="hoverEffect"
            className="ps-3 ms-1 d-flex align-items-center rounded gap-2"
            style={{ height: "48px", width: "90%" }}
          >
            <MdSupervisedUserCircle size="25" style={{ color: "#84818A" }} />
            Job Applicants
          </div>
        </CustomLink>
        <p className="text-muted ms-4 mt-2" style={{ marginBottom: "-2px" }}>
          Organization
        </p>
        <CustomLink to="staff">
          <div
            onClick={() => setStaffDropDown(!staffDropDown)}
            id="hoverEffect"
            className="ps-3 ms-1 d-flex align-items-center rounded gap-2 position-relative"
            style={{ height: "48px", width: "90%" }}
          >
            {<GiMatterStates size="25" style={{ color: "#84818A" }} />}
            Staff Matters
            {staffDropDown ? (
              <AiOutlineUp className="position-absolute end-0 me-3" />
            ) : (
              <AiOutlineDown
                color="white"
                className="position-absolute end-0 me-3"
              />
            )}
          </div>
        </CustomLink>
        <div
          className={staffDropDown ? "d-block" : "d-none"}
          // style={{ fontSize: "14px" }}
        >
          {/* <div className='d-flex flex-column align-items-center px-4'>
            <Link
              to='staff/permanent-staff'
              className='w-100 py-2 ps-2'
              style={{ borderBottom: "1px solid #2D1460" }}>
              Permanent Staff
            </Link>
            <Link
              to='staff/temporary-staff'
              className='w-100 py-2 ps-2'
              style={{ borderBottom: "1px solid #2D1460" }}>
              Temporary Staff
            </Link>
          </div> */}
          <div className="d-flex flex-column align-items-center px-4">
            <Link
              style={{ borderBottom: "1px solid #2D1460" }}
              to="staff/assumption-of-Duty"
              className="w-100 py-2 px-2"
            >
              Certification of Assumption of Duty
            </Link>
            <Link
              style={{ borderBottom: "1px solid #2D1460" }}
              className="w-100 py-2 px-2"
              to="staff/temporary-regularized-appointment"
            >
              Temporary regularized appointment
            </Link>
            <Link
              style={{ borderBottom: "1px solid #2D1460" }}
              className="w-100 py-2 px-2"
              to="staff/confirmed-appointments"
            >
              Confirmed Appointment
            </Link>
            <Link
              style={{ borderBottom: "1px solid #2D1460" }}
              className="w-100 py-2 px-2"
              to="staff/withdrawal-appointments"
            >
              Withdrawal Appointment
            </Link>
            {/* <Link
              style={{ borderBottom: "1px solid #2D1460" }}
              className='w-100 py-2 px-2'
              to='staff/staff-appraisal'>
              Staff Appraisal
            </Link> */}
            {/* <Link
              style={{ borderBottom: "1px solid #2D1460" }}
              className='w-100 py-2 px-2'
              to='staff/spadev-applications'>
              Spadev Applications
            </Link> */}
          </div>
        </div>
        <CustomLink to="leave">
          <div
            id="hoverEffect"
            className="ps-3 ms-1 d-flex align-items-center rounded gap-2 position-relative"
            style={{ height: "48px", width: "90%" }}
          >
            <IoTimerSharp size="25" style={{ color: "#84818A" }} />
            Leave Matters
          </div>
        </CustomLink>
        <CustomLink to="staffsonleave">
          <div
            id="hoverEffect"
            className="ps-3 ms-1 d-flex align-items-center rounded gap-2 position-relative"
            style={{ height: "48px", width: "90%" }}
          >
            <BsInboxes size="25" style={{ color: "#84818A" }} />
            Staffs On Leave
          </div>
        </CustomLink>
        <CustomLink to="spadev">
          <div
            id="hoverEffect"
            className="ps-3 ms-1 d-flex align-items-center rounded gap-2"
            style={{ height: "48px", width: "90%" }}
          >
            <GiTeamUpgrade size="25" style={{ color: "#84818A" }} />
            SPADEV
          </div>
        </CustomLink>
        <CustomLink to="report">
          <div
            id="hoverEffect"
            className="ps-3 ms-2 d-flex align-items-center rounded gap-2"
            style={{ height: "48px", width: "90%" }}
          >
            <MdInsertChart size="25" style={{ color: "#84818A" }} />
            Report
          </div>
        </CustomLink>

        <p className="text-muted ms-4 pb-1 mt-1" style={{ marginBottom: "0" }}>
          Others
        </p>
        <CustomLink to="setting">
          <div
            id="hoverEffect"
            className="ps-3 ms-1 d-flex align-items-center rounded gap-2"
            style={{ height: "48px", width: "90%", marginTop: "0px" }}
          >
            <IoSettings size="25" style={{ color: "#84818A" }} />
            Settings
          </div>
        </CustomLink>
        <LogoutModal />
        </div>
      </div>
    </div>
  );
  function CustomLink({ to, children, ...props }) {
    const resolvedpath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedpath.pathname, end: true });
    return (
      <div id={isActive ? "active" : ""}>
        <div className={isActive ? "ss bg-white" : "d-none"}></div>
        <Link to={to} {...props}>
          {children}
        </Link>
      </div>
    );
  }
};

export default HodLeftNavbar;
