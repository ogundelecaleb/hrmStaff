import React, { useState } from "react";
import {
  Flex,
} from "@chakra-ui/layout";
const InReview = (props) => {

  const [reviewStatus, setReviewStatus] = useState("In Progress");

  const handleStatusChange = (newStatus) => {
    setReviewStatus(newStatus);
  };

  return (
    <div className='border-bottom pb-4'>
      <p className='fw-semibold fs-6'>Stage Info</p>
      <div className='row'>
        <div className='col-lg-6'>
          <div>
            <p className='text-muted'>Submission Date</p>
            <p className='fw-semibold' style={{ marginTop: "-15px" }}>
              10 - 13 july 2023
            </p>
          </div>
          <div>
            <button className='my-4 btn btn-outline-dark rounded-0' onClick={props.moveToNextStage}>
              Move To Next Stage
            </button>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='d-flex justify-space-between'>
            <p className='text-muted py-1'>Review Status:</p>
            <p className='fw-semibold text-warning px-1 py-1 d-flex justify-content-center rounded-3'>
              {reviewStatus}
            </p>
          </div>
          <Flex className='justify-space-between' gap='4'>
            <div w='16'>
                <button className='text-danger rounded-0 btn border' onClick={() => handleStatusChange("Rejected")}>Reject</button>
              </div>
              <div w='16'>
                <button className='btn btn-success rounded-0' onClick={() => handleStatusChange("Passed")}>Pass</button>
              </div>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default InReview;
