import React, { useState, useEffect, useCallback } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useParams } from "react-router-dom";

const AdditionalInfo = ({ navigate }) => {

  const location = useLocation();
  const {
    fullName,
    maritalStatus,
    department,
    dateOfFirstAppointment,
    rankDesignation,
    selectedLeaveType,
    dateResumed,
    defferedLeave,
    leaveDue,
    totalDue,
    startDate,
    endDate,
    addressLeave
  } = location.state;

  console.log(location.state);


  return (
    <div className='container-fluid'>
      <div className='row'>
        <div class='border-bottom ps-4' id='sec-padding-res'>
          <h1 class='fs-3 fw-semibold'>Leave</h1>
          <p class='fs-5'>Kindly fill in the required information</p>
        </div>
        <div className='col-md-6'>
          <form
            class=' ps-4 pt-5 '
            id='sec-padding-res'
            style={{ paddingBottom: "100px" }}>
            <div class='pb-5'>
              <div class='mb-3'>
                <label
                  for='exampleInputEmail1'
                  class='form-label fs-6 fw-semibold h-10'>
                  Phone Number while on Leave
                </label>
                <input type='email' class='form-control rounded-0' />
              </div>

              <div class='mb-3'>
                <label class='form-label fs-6 fw-semibold'>
                  Schedule of Duties (Name of Staff)
                </label>
                <input class='form-control rounded-0' />
              </div>
              <div class='mb-3'>
                <label class='form-label fs-6 fw-semibold'>Resumption Date</label>
                <input type='date' class='form-control rounded-0' />
                {/* <DatePicker selected={startDate}  onChange={(date) => setStartDate(date)}  /> */}
              </div>
            </div>

            {/* <Link to='leaveSecond'> */}
            <button
              type='submit'
              onClick={() => navigate("submited")}
              style={{
                backgroundColor: " #984779",
                borderColor: "white",
                right: 50,
                position: "absolute",
              }}
              class='my-10 p-2 text-md-start text-white fs-6 fw-semibold'>
              Submit
            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;