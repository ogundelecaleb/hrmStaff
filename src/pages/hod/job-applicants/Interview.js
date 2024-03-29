import React, { useState } from "react";
import {
  Box,
  Divider,
  Flex,
} from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { BiMessageAltDetail } from "react-icons/bi";
import 'intl';
import 'intl/locale-data/jsonp/en';
import { getYear, getMonth } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Interview = (props) => {
 
  const [reviewStatus, setReviewStatus] = useState("Scheduled");

  const handleStatusChange = (newStatus) => {
    setReviewStatus(newStatus);
  };
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

  return (
    <div className='border-bottom pb-4'>
      <p className='fw-semibold fs-6'>Stage Info</p>
      <div className='row'>
        <div className='col-lg-6'>
          <div>
            <p className='text-muted'>Interview Date:</p>
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
          <div className="pt-4">
            <p className='text-muted'>Moderator Name</p>
            <p className='fw-semibold' style={{ marginTop: "-15px" }}>
              Dr Ajanaku
            </p>
          </div>
          <div>
            <button className='my-4 btn btn-outline-dark rounded-0' onClick={props.moveToNextStage}>
              Move To Next Step
            </button>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='d-flex  justify-space-between'>
            <p className='text-muted py-1'>Interview Status:</p>
            <p className='fw-semibold text-warning px-1 py-1 d-flex justify-content-center rounded-3'>
              {reviewStatus}
            </p>
          </div>
          <Flex className='justify-space-between' gap='4'>
            <div w='16'>
                <button className='text-danger rounded-0 btn border' onClick={() => handleStatusChange("Failed")}>Failed</button>
              </div>
              <div w='16'>
                <button className='btn btn-success rounded-0' onClick={() => handleStatusChange("Passed")}>Pass</button>
              </div>
          </Flex>
          <>
            <Divider />
            <Box>
              <Input
                h='16'
                borderRadius={"0"}
                border='1px solid #2D394C1A'
                placeholder='Add a comment...'
                
              />
              <Flex pt='5' gap='4'>
                <Button
                  h='12'
                  w='full'
                  borderRadius={"0"}
                  border='1px solid #2D394C1A'
                  bg='white'
                  color='#4640DE'
                  >
                  Comment
                </Button>
                <Button
                  h='12'
                  w='16'
                  borderRadius={"0"}
                  border='1px solid #2D394C1A'
                  bg='white'
                  color='#4640DE'>
                  <BiMessageAltDetail />
                </Button>
              </Flex>    
            </Box>
            <Divider />
          </>
        </div>
      </div>
    </div>
  );
};

export default Interview;
