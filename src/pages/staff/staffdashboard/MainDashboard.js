import React from "react";
import { Md6K } from "react-icons/md";
// import { Progress } from "@chakra-ui/react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const MainStaffDashboard = ({ reuseAbleNavigation }) => {
  return (
    <div
      className='container'
      style={{ paddingLeft: "6%", paddingRight: "6%" }}>
      <p className='text-muted fs-6 pt-5'>Overview</p>
      <div className='row' style={{ marginTop: "-10px" }}>
        <div
          className='col-lg-3 mt-3'
          style={{ border: "1px solid #EFF4F8", borderRadius: 10 }}>
          <div>
            <div className='mt-4' style={{ color: "#984779" }}>
              {<Md6K size='25' />}
            </div>
            <p className='fs-4 mt-2 fw-semibold'>0</p>
            <p
              className='fs-6 text-muted fw-normal'
              style={{ marginTop: "-10px" }}>
              Leave Application
            </p>
          </div>
        </div>
        <div className='col-lg-1' style={{ width: "10px" }}></div>
        <div
          className='col-lg-3 mt-3'
          style={{ border: "1px solid #EFF4F8", borderRadius: 10 }}>
          <div>
            <div
              className='mt-4 border rounded-3 d-grid'
              style={{
                color: "#984779",
                width: "50px",
                height: "50px",
                placeItems: "center",
              }}>
              {<Md6K size='25' />}
            </div>
            <p className='fs-4 mt-2 fw-semibold'>0</p>
            <p
              className='fs-6 text-muted fw-normal'
              style={{ marginTop: "-10px" }}>
              Total Requests
            </p>
          </div>
        </div>
      </div>
      <div className='row mt-5 ' style={{ height: "130px" }}>
        <div
          className='col-lg-12 rounded-1 px-3 d-flex justify-content-between align-items-center border'
          style={{ border: "1px solid #EFF4F8", borderRadius: 10 }}>
          <div className='d-flex gap-3 align-items-center'>
            <CircularProgress
              value={40}
              thickness='6'
              size='75'
              color='green.400'>
              <CircularProgressLabel>
                {/* <MyPieChart /> */}
              </CircularProgressLabel>
            </CircularProgress>
            <div className='line-height-10'>
              <p class='fs-4 fw-semibold'>Complete all Process</p>

              <p className='fs-6 text-muted' style={{ lineHeight: "0px" }}>
                Your personal records profile is{" "}
                <span className='text-warning'>65%</span> completed
              </p>
            </div>
          </div>
          <div>
            <button
              className='btn btn-primary'
              style={{ backgroundColor: "#984779", border: "none" }}>
              Complete Profile
            </button>
          </div>
        </div>
      </div>
      <div className='row mt-4 mb-2'>
        <div className='col-lg-8'>
          <p className='fs-5 fw-semibold' style={{ marginLeft: "-13px" }}>
            TO-Do
            <div class='page-content page-container' id='page-content'>
              <div class='row'>
                <div class='timeline p-4 block mb-4'>
                  <div class='tl-item active'>
                    <div class='tl-dot'>
                      {/* <a class='tl-author' href='#' data-abc='true'> */}
                      <span class='avatar circle gd-warning'></span>
                      {/* </a> */}
                    </div>
                    <div className='col-lg-11 pt-3 pb-1 ms-3 shadow rounded row'>
                      <div className='col-lg-9'>
                        <p class='fw-semibold' style={{ fontSize: "17px" }}>
                          Complete your Personal Records / Work Profile
                        </p>
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: "lighter",
                            marginTop: "-10px",
                          }}>
                          Go to your Personal records and fill out every
                          Personal detail recquested
                        </p>
                      </div>
                      <div className='col-lg-3'>
                        <div className='text-end h-100 w-100 d-flex align-items-center'>
                          <button
                            className='btn py-1 px-2 btn-sm btn-primary'
                            style={{
                              backgroundColor: "#984779",
                              border: "none",
                              fontSize: "13px",
                            }}>
                            Complete Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class='tl-item'>
                    <div class='tl-dot'>
                      {/* <a class='tl-author' href='#' data-abc='true'> */}
                      <span class='avatar circle gd-warning'></span>
                      {/* </a> */}
                    </div>
                    <div className='col-lg-11 mt-5 pt-3 pb-1 ms-3 shadow rounded row'>
                      <div className='col-lg-12'>
                        <p class='fw-semibold' style={{ fontSize: "17px" }}>
                          Fill the Certificate of Assumption Duty form
                        </p>
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: "lighter",
                            marginTop: "-10px",
                          }}>
                          filling out the assumption of duty form enables
                          the verification of your work status
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </p>
        </div>
        <div className='col-lg-4 ps-5'>
          <p className='fs-5 fw-semibold' style={{ color: "#984779" }}>
            Upcoming Event
          </p>
          <div>
            <div className='border-bottom pt-3 mt-5'>
              <p className='fs-6 mt-1 fw-semibold'>Monday, 23 jan 2023</p>
              <p style={{ marginTop: "-10px" }}>Leave commences</p>
            </div>
            <div className='pt-3'>
              <p className='fs-6 mt-1 fw-semibold'>Monday, 23 jan 2023</p>
              <p style={{ marginTop: "-10px" }}>Leave commences</p>
            </div>
            <div>
              <p
                onClick={() => reuseAbleNavigation("leavestatus")}
                className='text-center mt-5 pt-4'
                style={{ color: "#984779" }}>
                See all Event
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainStaffDashboard;
