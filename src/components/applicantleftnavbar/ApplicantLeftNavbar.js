import React from "react";
import "../dasLeftNav.css";
import schLogo from "../../asset/logo(small).svg";
import { MdDashboard, MdMoveToInbox } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import { RxReload } from "react-icons/rx";
import { BsFilePersonFill } from "react-icons/bs";
import { RiBubbleChartFill } from "react-icons/ri";
import { HiUpload } from "react-icons/hi";
import { MdInsertChart } from "react-icons/md";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useState } from "react";
import LogoutModal from "../../pages/hod/logout/Logout";

const ApplicantLeftNavbar = ({ mobile, setMobile }) => {
  const dash1Style = { flexDirection: "column" };
  const [settingDropDown, setSettingDropDown] = useState(false);
  return (
    <div className={mobile ? "leftNav" : "swapLeftNav"}>
      <div
        onClick={() => setMobile(true)}
        style={dash1Style}
        className='over-class d-flex gap-2 ps-2 pt-3'>
        <div className='d-flex justify-content-center pe-3 pb-2'>
          <img src={schLogo} alt='schhol_image' />
        </div>
        <CustomLink to='dashboard'>
          <div
            id='hoverEffect'
            className='ps-3 ms-1 d-flex align-items-center rounded gap-2'
            style={{ height: "48px", width: "90%" }}>
            <MdDashboard size='25' style={{ color: "#84818A" }} />
            Dashboard
          </div>
        </CustomLink>

        <CustomLink to='inbox'>
          <div
            id='hoverEffect'
            className='ps-3 ms-1 d-flex align-items-center rounded gap-2'
            style={{ height: "48px", width: "90%" }}>
            <MdMoveToInbox size='25' style={{ color: "#84818A" }} />
            Inbox
          </div>
        </CustomLink>


        <p className='text-muted ms-4 mt-2' style={{ marginBottom: "-2px" }}>
          Job Seeker
        </p>
        <CustomLink to='personal-record'>
          <div
            id='hoverEffect'
            className='ps-3 ms-1 d-flex align-items-center rounded gap-2'
            style={{ height: "48px", width: "90%", marginTop: "0px" }}>
            <MdMoveToInbox size='25' style={{ color: "#84818A" }} />
            Personal CV
          </div>
        </CustomLink>
        <CustomLink to='job-listing'>
          <div
            id='hoverEffect'
            className='ps-3 ms-1 d-flex align-items-center rounded gap-2'
            style={{ height: "48px", width: "90%" }}>
            <MdMoveToInbox size='25' style={{ color: "#84818A" }} />
            Job listing
          </div>
        </CustomLink>
        <CustomLink to='job-applicants'>
          <div
            id='hoverEffect'
            className='ps-3 ms-1 d-flex align-items-center rounded gap-2'
            style={{ height: "48px", width: "90%" }}>
            <MdMoveToInbox size='25' style={{ color: "#84818A" }} />
            Application Status
          </div>
        </CustomLink>
        <p className='text-muted ms-4 mt-2' style={{ marginBottom: "-2px" }}>
        Others
        </p>
        <CustomLink to='account-profile'>
          <div
            id='hoverEffect'
            className='ps-3 ms-1 d-flex align-items-center rounded gap-2'
            style={{ height: "48px", width: "90%" }}>
            <MdMoveToInbox size='25' style={{ color: "#84818A" }} />
            Account Profile
          </div>
        </CustomLink>
        <LogoutModal/>
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
export default ApplicantLeftNavbar;