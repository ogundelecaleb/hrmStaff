import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSnackbar } from "notistack";
import api from "../../../../../api";
import { getUserDetails } from "../../../../../utils/utils";
import { MoonLoader } from "react-spinners";
import { getYear, getMonth } from 'date-fns';
import {
  Box,
} from "@chakra-ui/react";

const ResumptionOfLeave = ({ navigate }) => {

  const { enqueueSnackbar } = useSnackbar();
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingd, setIsLoadingd] = useState(false);
  const [concludedLeave, setConcludedLeave] = useState('');
  const [dateResumed, setDateresumed] = useState('');
  const [leaveDuration, setLeaveDuration] = useState('');
  const [leaveLocation, setLeaveLocation] = useState('');
  const [pfNumber, setPfNumber] = useState('');
  const [formValues, setFormValues] = useState({});

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
  useEffect(() => {
    if (userDetails) {
      fetchUserDetails();
    }
  }, []);

  async function fetchUserDetails() {
    try {
      setIsLoading(true);
      const userDetails = await getUserDetails();
      console.log("User Details:", userDetails);
      setUserDetails(userDetails.data)
    } catch (error) {
      console.error("Error fetching your basic details", error);
      enqueueSnackbar(error.message, { variant: 'error' })
    }finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (userDetails) {
      setFormValues({
        department: userDetails?.department?.name,
        faculty: userDetails?.faculty?.name,
        unit: userDetails?.unit?.name,
        date_of_first_appointment: userDetails?.date_of_first_appointment,
        marital_status: userDetails?.marital_status,
        role: userDetails?.role,
        type: userDetails?.type
      });
    }
  }, [userDetails]);

  async function handleSubmit (e)  {
    e.preventDefault();
    setIsLoadingd(true);

    try {
      let department_unit = "";

      if (formValues.type === 'ASE' && formValues.role === 'DEAN') {
        department_unit = formValues.faculty;
      } else if (formValues.type === 'ASE' && (formValues.role === 'HOD' || formValues.role === 'RSWEP')) {
        department_unit = formValues.department;
      } else if (formValues.type === 'NASE') {
        department_unit = formValues.unit;
      }
      const response = await api.requestLeave({
        full_name: `${userDetails?.first_name} ${userDetails?.last_name}`,
        date_resumed: dateResumed,
        pf_no: pfNumber,
        department_unit: department_unit,
        type_of_leave: concludedLeave,
        duration_of_leave: leaveDuration,
        location: leaveLocation,
      });  
      console.log("responce==>>>>>", response);
      enqueueSnackbar('Application successfull', { variant: 'success' })
      setIsLoadingd(false);
      navigate("submited");
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error.message, { variant: 'error' })
      setIsLoadingd(false);
    }
  };

  if (isLoading) {
    return (
      <Box
        w={"80vw"}
        display="flex"
        flexDirection="column"
        h={"80vh"}
        alignItems="center"
        justifyContent="center"
      >
        <div
          className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70"
          style={{ zIndex: 9999 }}
        >
          <div className="inline-block">
            <MoonLoader color={"#984779"} size={80} />
          </div>
        </div>
      </Box>
    );
  }
  
  return (
    <div>
      <div class='border-bottom ps-4'>
        <h1 class='fs-4 fw-semibold'>Resumption of Leave </h1>
        <p class='fs-5'>Kindly fill in the required information</p>
      </div>
      <form className='row px-4 pt-4'>
        <div className='col-lg-6 ' 
        onSubmit={handleSubmit}
        >
          <div class='mb-3'>
            <label
              for='exampleInputEmail1'
              class='form-label fs-6 fw-semibold h-10'>
              Full Name<sup className='text-danger'>*</sup>
            </label>
            <input type='name' class='form-control rounded-0'  value={`${userDetails?.first_name} ${userDetails?.last_name}`} disabled/>
          </div>
          <div class='mb-3'>
            <label
              for='exampleInputEmail1'
              class='form-label fs-6 fw-semibold h-10'>
              Rank<sup className='text-danger'>*</sup>
            </label>
            <input type='name' class='form-control rounded-0' disabled
            value={formValues.role}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                role: e.target.value,
              })
            }/>
          </div>
          <div class='mb-3'>
            <label
              for='exampleInputEmail1'
              class='form-label fs-6 fw-semibold h-10'>
              PF/CM No
            </label>
            <input type='number' class='form-control rounded-0' required value={pfNumber}
            onChange={(e) => setPfNumber(e.target.value)}/>
          </div>
          {formValues.type === 'ASE' && formValues.role === 'DEAN' && (
              <div class='mb-3'>
                <label
                  for='exampleInputEmail1'
                  class='form-label fs-6 fw-semibold'>
                  Faculty
                </label>
                <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  disabled
                  value={formValues.faculty}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      faculty: e.target.value,
                    })
                  }
                />
              </div>
            )}

            {(formValues.type === 'ASE' && (formValues.role === 'HOD' || formValues.role === 'RSWEP')) && (

              <div class='mb-3'>
                <label
                  for='exampleInputEmail1'
                  class='form-label fs-6 fw-semibold'>
                  Department
                </label>
                <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  disabled
                  value={formValues.department}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      department: e.target.value,
                    })
                  }
                />
              </div>
            )}

            {formValues.type === 'NASE' && (

              <div class='mb-3'>
                <label
                  for='exampleInputEmail1'
                  class='form-label fs-6 fw-semibold'>
                  Unit
                </label>
                <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  disabled
                  value={formValues.unit}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      unit: e.target.value,
                    })
                  }
                />
              </div>
            )}

          <div class='mb-3'>
            <label
              for='exampleInputEmail1'
              class='form-label fs-6 fw-semibold'>
              Just concluded Leave Type<sup className='text-danger'>*</sup>
            </label>
            <select
               value={concludedLeave}
               onChange={(e) => setConcludedLeave(e.target.value)}
              class='form-select rounded-0'
              aria-label='Default select example'>
              <option selected>Leave Type</option>
              <option value='annual-leave'>Annual Leave</option>
              <option value='casual-leave'>Casual Leave</option>
              <option value='compasionate-leave'>Compasionate Leave</option>
              <option value='adoption-leave'>Adoption Leave</option>
              <option value='sick-leave'>Sick Leave</option>
              <option value='maternity-leave'>Maternity Leave</option>
              <option value='paternity-leave'>Paternity Leave </option>
              <option value='research-leave'>Research Leave</option>
              <option value='sabbatical-leave'>Sabatical Leave</option>
              <option value='study-leave'>Study Leave </option>
              <option value='training-leave'>Training Leave</option>
              <option value='leave-of-absence'>Leave of Absence</option>
              <option value='permission-to-be-away'>Permission to be away</option>
            </select>
          </div>

          <div class='mb-3 flex flex-col'>
            <div>
              <label class='form-label fs-6 fw-semibold'>Resumption Date</label>
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
                  selected={dateResumed ? new Date(dateResumed) : null}
                  onChange={(date) => {
                    if (date instanceof Date && !isNaN(date)) {
                      const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                      setDateresumed(formattedDate);
                    } else {
                      setDateresumed('');
                    }
                  }}
                  dateFormat='yyyy-MM-dd'
                  className='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  shouldCloseOnSelect={true}
                />
          </div>
          <div class='mb-3'>
            <label
              for='exampleInputEmail1'
              class='form-label fs-6 fw-semibold h-10'>
              Duration of Leave
            </label>
            <input  class='form-control rounded-0' required value={leaveDuration}
            onChange={(e) => setLeaveDuration(e.target.value)}/>
          </div>
          <div class='mb-3'>
            <label
              for='exampleInputEmail1'
              class='form-label fs-6 fw-semibold h-10'>
              Location
            </label>
            <input  class='form-control rounded-0' required value={leaveLocation}
            onChange={(e) => setLeaveLocation(e.target.value)}/>
          </div>
          
        </div>
        <div className='col-lg-12 py-5 d-flex justify-content-end'>
            <div>
              <button
                className='btn py-2 px-4 me-2  text-white rounded-0'
                style={{ backgroundColor: "#984779" }} disabled={isLoadingd} type="submit">
                {isLoadingd ? (
                  <MoonLoader color={"white"} size={20} />
                ) : (<>Submit</>
                )}
              </button>
            </div>
          </div>
      </form>
    </div>
  );
};

export default ResumptionOfLeave;
