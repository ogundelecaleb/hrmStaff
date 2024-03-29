import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import {

  Flex,
} from "@chakra-ui/layout";
import 'intl';
import 'intl/locale-data/jsonp/en';
import { getYear, getMonth } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CbtTest = (props) => {

  const [reviewStatus, setReviewStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTestScore, setNewTestScore] = useState(0);

  function range(start, end, step) {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  }
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const handleStatusChange = (newStatus) => {
    setReviewStatus(newStatus);
    setShowModal(true); 
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleTestScoreChange = (event) => {
    setNewTestScore(event.target.value);
  };

  const handleSaveChanges = () => {
    setReviewStatus(reviewStatus);
    setShowModal(false); 
  };

  return (
    <div className='border-bottom pb-4'>
      <p className='fw-semibold fs-6'>Stage Info</p>
      <div className='row'>
        <div className='col-lg-6'>
          <div>
            <p className='text-muted'>Test Date:</p>
            <DatePicker
              shouldCloseOnSelect={true}
              autoComplete="off"
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                    {"<"}
                  </button>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
        
                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
        
                  <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                    {">"}
                  </button>
                </div>
              )}
              dateFormat='yyyy-MM-dd'
              className='form-control rounded-0 '
              id='exampleFormControlInput1'
              required
            />
          </div>
          <div className="mt-4">
            <p className='text-muted'>Test Score: </p>
            <p className='fw-semibold' style={{ marginTop: "-15px" }}>
              {newTestScore}
            </p>
          </div>
          <div>
            <button className='my-4 btn btn-outline-dark rounded-0'onClick={props.moveToNextStage}>
              Move To Next Step
            </button>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='d-flex justify-space-between'>
            <p className='text-muted py-1 '>Test Status:</p>
            <p className='fw-semibold text-warning px-1 py-1 pr-2 d-flex justify-content-center rounded-3'>
              {reviewStatus}
            </p>
          </div>
        
          <Flex className=' justify-space-between ' gap='4'>
            <div w='16'>
              <button className='text-danger rounded-0 btn border' onClick={() => handleStatusChange("Fail")}>Fail</button>
            </div>
            <div w='16'>
              <button className='btn btn-success rounded-0' onClick={() => handleStatusChange("Passed")}>Pass</button>
            </div>
          </Flex>
         
        </div>
      </div>
   
        <Modal isOpen={showModal} onClose={handleModalClose}>
          <ModalOverlay />
            <ModalContent>
              <ModalHeader>Change Test Score</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <p>Input Test Score</p>
                <input
                  type='number'
                  value={newTestScore}
                  onChange={handleTestScoreChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleModalClose}>
                  Close
                </Button>
                <Button colorScheme="green" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </ModalFooter>
            </ModalContent>
        </Modal>

    </div>
  );
};

export default CbtTest;
