import React, { useState,useEffect } from "react";
import {
  Box,
} from "@chakra-ui/react";
import { getYear, getMonth } from 'date-fns';
import DatePicker from "react-datepicker";
import { useSnackbar } from "notistack";
import "react-datepicker/dist/react-datepicker.css";
import CommonButton from "../../../../../components/commonbutton/Button";
import { useLocation, useNavigate } from "react-router-dom";
import WithdrawalThirdPage from "./WithdrawalThirdPage";

const WithdrawalSecondPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const { formValues, gradeValue, staffPf, rank, appointmentType } =
    location.state;
  console.log("values", formValues, gradeValue, staffPf, rank, appointmentType);
  const [salaryScale, setSalaryScale] = useState("");
  const [rsaPin, setRsaPin] = useState("");
  const [pensionFund, setPensionFunds] = useState("");
  const [assumptionDate, setAssumptionDate] = useState("");
  const [exitDate, setExitDate] = useState("");
  const [address, setAddress] = useState("");
  const [showSection, setShowSection] = useState(null);

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

  const handleNavigate = () => {
    if (!rsaPin || !pensionFund || !assumptionDate || !exitDate || !address) {
      enqueueSnackbar("Please fill in all required fields.", { variant: 'error' })
      return;
    }
    setShowSection(true);
  };

  const formattedAssumptionDate = assumptionDate
  ? new Date(assumptionDate).toISOString().split('T')[0]
  : null;

  const formattedExitDate = exitDate
  ? new Date(exitDate).toISOString().split('T')[0]
  : null;

  const formData = {
    rsaPin,
    pensionFund,
    formattedAssumptionDate,
    formattedExitDate,
    address,
    gradeValue,
    staffPf,
    rank,
    salaryScale,
    appointmentType,
  };

  return (
    <Box>
      {showSection ? (
        <WithdrawalThirdPage formValues={formValues} formData={formData} />
      ) : (
      <div className='container'>
        <div className='border-bottom pt-2 px-5'>
          <p className='fs-3 fw-semibold'>Withdrawal of Appointment</p>
          <p className='fs-5' style={{ marginTop: "-19px" }}>
            Kindly fill in the required information
          </p>
        </div>
        <div className='px-5 row'>
          <div className='col-lg-6'>
            <form>
              <div class='form-group mt-2'>
                <label
                  for='exampleFormControlSelect1'
                  className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                  Salary scale<sup className='text-danger'>*</sup>
                </label>
                <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  value={salaryScale} onChange={(e) => setSalaryScale(e.target.value)}
                />
              </div>
              <div class='form-group mt-2'>
                <label
                  for='exampleFormControlSelect1'
                  className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                  RSA Pin<sup className='text-danger'>*</sup>
                </label>
                <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  value={rsaPin} onChange={(e) => setRsaPin(e.target.value)}
                />
              </div>
              <div class='form-group mt-2'>
                <label
                  for='exampleFormControlSelect1'
                  className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                  Pension Fund Administration<sup className='text-danger'>*</sup>
                </label>
                <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  value={pensionFund} onChange={(e) => setPensionFunds(e.target.value)}
                />
              </div>
              <div class='mb-3 flex flex-col mt-4'>
                <div>
                  <label class='form-label fs-6 fw-semibold'>
                    Date of Assumption of Duty<sup className='text-danger'>*</sup>
                  </label>
                </div>
                <DatePicker
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
                    selected={assumptionDate ? new Date(assumptionDate) : null}
                    onChange={(date) => {
                      if (date instanceof Date && !isNaN(date)) {
                        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                        setAssumptionDate(formattedDate);
                      } else {
                        setAssumptionDate('');
                      }
                    }}
                    dateFormat='yyyy-MM-dd'
                    className='form-control rounded-0'
                    id='exampleFormControlInput1'
                    placeholder=''
                    shouldCloseOnSelect={true}
                  />
              </div>
              <div class='mb-3 flex flex-col mt-4'>
                <div>
                    <label class='form-label fs-6 fw-semibold'>
                    Effective Date of Exit from the College
                    <sup className='text-danger'>*</sup>
                  </label>
                </div>
                <DatePicker
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
                    selected={exitDate ? new Date(exitDate) : null}
                    onChange={(date) => {
                      if (date instanceof Date && !isNaN(date)) {
                        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                        setExitDate(formattedDate);
                      } else {
                        setExitDate('');
                      }
                    }}
                    dateFormat='yyyy-MM-dd'
                    className='form-control rounded-0'
                    id='exampleFormControlInput1'
                    placeholder=''
                    shouldCloseOnSelect={true}
                  />
              </div>
              <div class='form-group mt-2'>
                <label
                  for='exampleFormControlSelect1'
                  className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                  Residential Addresst in Lasucom
                  <sup className='text-danger'>*</sup>
                </label>
                <textarea className='form-control rounded-0' value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
              </div>
            </form>
          </div>
          <div className='col-lg-6'> </div>
        </div>
        <div className='py-5'>
          <CommonButton
            title={"Proceed to Next"}
            action={handleNavigate}
          />
        </div>
      </div>
      )}
    </Box>
  );
};

export default WithdrawalSecondPage;
