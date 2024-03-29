import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import React from "react";

const LeaveStatus = () => {
  
  return (
    <div className='container px-5'>
      <div>
        <p className='fs-1 mt-2 '>Leave Status</p>
      </div>
      <div className='ps-5 pt-5'>
        <CircularProgress value={50} thickness='9' size='200' color='green.400'>
          <CircularProgressLabel>
            <p className='fs-1 mt-2 fw-semibold'>50%</p>
          </CircularProgressLabel>
        </CircularProgress>
      </div>
      <div className='row mt-4'>
        <div className='col-lg-5 border pt-3'>
          <div className='d-flex justify-content-between'>
            <p className='fw-semibold fs-6'>Maternity Leave</p>
            <p className='text-muted fs-6 fw-ligther'>
              Applied 3 days ago{" "}
              <label
                className='bg-info mx-1 mb-1 rounded-5'
                style={{ height: "5px", width: "5px" }}></label>{" "}
              <span>8:30</span>
            </p>
          </div>
          <p className='fs-6'>Application in Progress</p>
        </div>
      </div>
      <div>
        <p className='fs-1 mt-5 '>Leave History</p>
      </div>
      <div className='pb-5 table-responsive'>
        <table id='tab' class='table table-hover'>
          <thead>
            <tr>
              <td className='text-muted'>Leave Type</td>
              <td className='text-muted'>Date Applied</td>
              <td className='text-muted'>Status</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Marternity Leave</td>
              <td>19 January 2023</td>
              <td>
                <span className='border-warning border text-warning rounded px-4 fw-semibold fs-6 py-1'>
                  Pending
                </span>
              </td>
            </tr>
            <tr>
              <td>Marternity Leave</td>
              <td>19 January 2023</td>
              <td>
                <span className='border-warning border text-warning rounded px-4 fw-semibold fs-6 py-1'>
                  Pending
                </span>
              </td>
            </tr>
            <tr>
              <td>Marternity Leave</td>
              <td>19 January 2023</td>
              <td>
                <span className='border-danger border text-danger rounded px-4 fw-semibold fs-6 py-1'>
                  Declined
                </span>
              </td>
            </tr>
            <tr>
              <td>Marternity Leave</td>
              <td>19 January 2023</td>
              <td>
                <span
                  className=' rounded px-4 fw-semibold fs-6 py-1'
                  style={{ color: "#984779", border: "1px solid #984779" }}>
                  Pending
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveStatus;
