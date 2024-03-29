import React from "react";
import { useState } from "react";
import Interview from "./Interview";
import HiredDecined from "./HiredDecined";
import InReview from "./InReview";
import Shortlisted from "./Shortlisted";
import CbtTest from "./CbtTest";
const HiringProgress = () => {
  const [tab, setTab] = useState("in-review");
  const switchTabs = (tabValue) => {
    setTab(tabValue);
  };

  const moveToNextStage = () => {
    if (tab === "in-review") {
      switchTabs("shortlisted");
    } else if (tab === "shortlisted") {
      switchTabs("CbtTest");
    }  else if (tab === "CbtTest") {
      switchTabs("interview");
    } else if (tab === "interview") {
      switchTabs("hired-declined");
    }
  };

  const chooseBackgroundColor = (tabValue) => {
    if (tab === tabValue) {
      return "#984779";
    }
  };
  const chooseColor = (tabValue) => {
    if (tab === tabValue) {
      return "white";
    }
  };
  return (
    <div>
      <p className='fw-semibold fs-5'>Current Stage</p>
      <div className='d-flex mt-4 flex-wrap justify-content-between justify-content-between'>
        <div
          onClick={() => switchTabs("in-review")}
          class='text-center fw-semibold py-2 tab   mb-0'
          style={{
            backgroundColor: chooseBackgroundColor("in-review"),
            color: chooseColor("in-review"),
            width: "16%",
          }}>
          In Review
        </div>
        <div
          onClick={() => switchTabs("shortlisted")}
          class='text-center fw-semibold py-2 tab  mb-0'
          style={{
            backgroundColor: chooseBackgroundColor("shortlisted"),
            color: chooseColor("shortlisted"),
            width: "16%",
          }}>
          Shortlisted
        </div>
        <div
          onClick={() => switchTabs("CbtTest")}
          class='text-center fw-semibold py-2 tab mb-0'
          style={{
            backgroundColor: chooseBackgroundColor("CbtTest"),
            color: chooseColor("CbtTest"),
            width: "16%",
          }}>
          CBT
        </div>
        <div
          onClick={() => switchTabs("interview")}
          class='text-center fw-semibold py-2 tab mb-0'
          style={{
            backgroundColor: chooseBackgroundColor("interview"),
            color: chooseColor("interview"),
            width: "16%",
          }}>
          Interview
        </div>

        <div
          class='text-center fw-semibold tab py-2 mb-0'
          onClick={() => switchTabs("hired-declined")}
          style={{
            backgroundColor: chooseBackgroundColor("hired-declined"),
            color: chooseColor("hired-declined"),
          }}>
          Hired/Decined
        </div>
      </div>
      <div className='mt-4'>
        {tab === "in-review" && (
        <div>
          <InReview moveToNextStage={moveToNextStage}/>
        </div>
        )}
        {tab === "shortlisted" && (
          <div>
            <Shortlisted moveToNextStage={moveToNextStage}/>
          </div>
        )}
        {tab === "CbtTest" && (
          <div>
            <CbtTest moveToNextStage={moveToNextStage}/>
          </div>
        )}
        {tab === "interview" && (
          <div>
            <Interview moveToNextStage={moveToNextStage}/>
          </div>
        )}
        {tab === "hired-declined" && (
          <div>
            <HiredDecined moveToNextStage={moveToNextStage}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default HiringProgress;
