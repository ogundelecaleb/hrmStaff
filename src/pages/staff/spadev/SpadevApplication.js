import { Box, Input, Text, } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../../utils/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from 'date-fns';

const SpadevApplication = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentType, setAppointmentType] = useState("");
  const [staffType, setStaffType] = useState("");
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [completedFirstSection, setCompletedFirstSection] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [position, setPosition] = useState("");
  const [pfNumber, setPfNumber] = useState("");
  const [post, setPost] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [step, setStep] = useState("");
  const [firstAppoint, setFirstAppoinnt] = useState("");
  const [firstGrade, setFirstGrade] = useState("");
  const [presentDatePost, setPresentDatePost] = useState("");
  const [unApproved, setUnapproved] = useState("");
  const [confirmedDate, setConfirmedDate] = useState("");
  const [firstAppointDate, setFirstAppointDate] = useState("");

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

  const getRoleBasedID = (userRole) => {
      if (userRole === 'HOD' || userRole === 'RSWEP') {
        return userDetails.department?.id;
      } else if (userRole === 'DEAN') {
        return userDetails.faculty?.id;
      } else if (userRole === 'HOU' || userRole === 'NTSWEP') {
        return userDetails.unit?.id;
      }
      return null;
  };
  const departmentOrUnitOrFacultyID = getRoleBasedID(userDetails.role);

  const rankDesignation = userDetails?.role;

  let departmentId = "";
  let facultyId = "";
  let unitId = "";

  if (rankDesignation === "HOD" || rankDesignation === "RSWEP") {
    departmentId = departmentOrUnitOrFacultyID;
  } else if (rankDesignation === "DEAN") {
    facultyId = departmentOrUnitOrFacultyID;
  } else if (rankDesignation === "HOU" || rankDesignation === "NTSWEP") {
    unitId = departmentOrUnitOrFacultyID;
  }

  const formattedConfirmedDate = confirmedDate
    ? new Date(confirmedDate).toISOString().split('T')[0]
    : null;

    const formattedPesentPostDate = presentDatePost
    ? new Date(presentDatePost).toISOString().split('T')[0]
    : null;

    const formattedFirstAppointDate = firstAppointDate
    ? new Date(firstAppointDate).toISOString().split('T')[0]
    : null;

  useEffect(() => {
    if (userDetails) {
      setFormValues({
          full_name: `${userDetails?.first_name} ${userDetails?.last_name}`,
          department: userDetails?.department?.name,
          faculty: userDetails?.faculty?.name,
          unit: userDetails?.unit?.name,
          conunass: userDetails?.conunass,
          role: userDetails?.role,
          type: userDetails?.type,
          staffLevel: userDetails?.level
      });
    }
  }, [userDetails]);

  const formData = {
    position,
    pfNumber,
    post,
    gradeLevel,
    step,
    firstAppoint,
    firstGrade,
    presentDatePost,
    unApproved,
    appointmentType,
    departmentId,
    facultyId,
    unitId,
    formattedFirstAppointDate,
    formattedConfirmedDate,
    formattedPesentPostDate,
  };

  const handleAppointmentChange = (event) => {
    setAppointmentType(event.target.value);
  };
  const handleStaffTypeChange = (event) => {
    setStaffType(event.target.value);
  };

  const handleNavigate = () => {
    let staffSenior = staffType === "senior_staff";
    let staffJunior = staffType === "junior_staff";

    if (staffSenior) {
      navigate("spadev-senior", {state: {formValues, formData}});
    } else if (staffJunior) {
      navigate("spadev-junior", {state: {formValues, formData}})
    }
  };
  const handleProceed = () => {
    if (completedFirstSection) {
      setShowAdditionalInfo(true);
    } else {
      setCompletedFirstSection(true);
    }
  };
  
  return (
    <Box>
      <Box py='2' pl='10' borderBottom='1px solid #EBEAED'>
        <Text fontSize={28} m='0' fontWeight='medium'>
          Staff Performance Appraisal and Development SPADEV
        </Text>
        <Text fontSize={20} fontWeight='normal'>
          Kindly fill in the required information
        </Text>
      </Box>
      <form
            class=' ps-4 pt-2 '
            id='sec-padding-res'
            style={{ paddingBottom: "100px" }} >
      <Box w='50%' p='4' style={{ display: !showAdditionalInfo ? "block" : "none" }}>
          <FormControl isRequired my='5'>
            <FormLabel color={"#515B6F"}>Appointment Type</FormLabel>
            <Select
                onChange={handleAppointmentChange}
                value={appointmentType}
                color={"#515B6F"}
                placeholder='Appointment Type'>
                <option value='temporary_appointment'>
                    Temporary Appointment
                </option>
                <option value='contract_appointment'>
                    Contract Appointment{" "}
                </option>
                <option value='casual_appointment'>Casual Appointment</option>
                <option value='permanent_appointment'>
                    Permanent Appointment
                </option>
            </Select>
        </FormControl>
        <FormControl isRequired my='5'>
          <FormLabel color={"#515B6F"}>Staff Type</FormLabel>
          <Select placeholder='Select Staff Type'  value={staffType} color={"#515B6F"} onChange={handleStaffTypeChange}>
            <option value='senior_staff'>Senior Staff</option>
            <option value='junior_staff'>Junior Staff</option>

          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel color={"#515B6F"}>Full Name</FormLabel>
          <Input placeholder='Full name' value={formValues.full_name} disabled/>
        </FormControl>
        <FormControl isRequired my='5'>
          <FormLabel color={"#515B6F"}>PF/CM No</FormLabel>
          <Input placeholder='PF/CM No' value={pfNumber} onChange={(e) => setPfNumber(e.target.value)} />
        </FormControl>
        {formValues.type === 'ASE' && formValues.role === 'DEAN' && (
        <FormControl isRequired>
            <FormLabel color={"#515B6F"}>Faculty</FormLabel>
            <Input disabled
            value={formValues.faculty}
            onChange={(e) =>
                setFormValues({
                ...formValues,
                faculty: e.target.value,
                })
            }/>
        </FormControl>
        )}
        {formValues.type === 'NASE' && (
        <FormControl isRequired>
            <FormLabel color={"#515B6F"}>Unit</FormLabel>
            <Input disabled
                value={formValues.unit}
                onChange={(e) =>
                    setFormValues({
                    ...formValues,
                    unit: e.target.value,
                    })
                }/>
        </FormControl>
        )}
        {(formValues.type === 'ASE' && (formValues.role === 'HOD' || formValues.role === 'RSWEP')) && (

        <FormControl my='5' isRequired>
            <FormLabel color={"#515B6F"}>Department</FormLabel>
            <Input  disabled
            value={formValues.department}
            onChange={(e) =>
                setFormValues({
                ...formValues,
                department: e.target.value,
                })
            }/>
        </FormControl>
        )}
        <FormControl isRequired my='5'>
          <FormLabel color={"#515B6F"}>Current Substantive post</FormLabel>
          <Input value={post} onChange={(e) => setPost(e.target.value)}  />
        </FormControl>
        <FormControl isRequired my='5'>
          <FormLabel color={"#515B6F"}>Grade Level</FormLabel>
          <Input placeholder='Level' value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} />
        </FormControl>
        <button
          type='button'
          onClick={handleProceed}
          style={{
            backgroundColor: " #984779",
            borderColor: "white",
            right: 50,
            position: "absolute",
          }}
          class=' p-2 text-md-start text-white fs-6 fw-semibold'>
          Proceed to Next
        </button>
      </Box>
      <Box w='50%' p='4' style={{ display: showAdditionalInfo ? "block" : "none" }}>
        <FormControl isRequired>
          <FormLabel color={"#515B6F"}>Grade Level/Step</FormLabel>
          <Input value={step} onChange={(e) => setStep(e.target.value)} />
        </FormControl>
        {/* <FormControl isRequired my='5'>
          <FormLabel color={"#515B6F"}>Date of First Appointment</FormLabel>
          <Input />
        </FormControl> */}
        <div class='mb-3 flex flex-col mt-2'>
          <div>
            <label class='form-label fs-6 fw-semibold'>
            Date of First Appointment<sup className='text-danger'>*</sup>
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
              selected={firstAppointDate ? new Date(firstAppointDate) : null}
              onChange={(date) => {
                if (date instanceof Date && !isNaN(date)) {
                  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                  setFirstAppointDate(formattedDate);
                } else {
                  setFirstAppointDate('');
                }
              }}
              dateFormat='yyyy-MM-dd'
              className='form-control rounded-0'
              id='exampleFormControlInput1'
              placeholder=''
              shouldCloseOnSelect={true}
          />
          </div>
        <FormControl isRequired my='5'>
          <FormLabel color={"#515B6F"}>Designation of First Appointment</FormLabel>
          <Input value={firstAppoint} onChange={(e) => setFirstAppoinnt(e.target.value)}  />
        </FormControl>
        <FormControl isRequired my='5'>
          <FormLabel color={"#515B6F"}>Grade Level of First Appointment</FormLabel>
          <Input  value={firstGrade} onChange={(e) => setFirstGrade(e.target.value)} />
        </FormControl>
        <FormControl my='5'>
          <FormLabel color={"#515B6F"}>Position Sought [If Promoted]</FormLabel>
          <Input  value={position} onChange={(e) => setPosition(e.target.value)} />
        </FormControl>
        {/* <FormControl isRequired my='5'>
          <FormLabel color={"#515B6F"}>Date of Present Substansive post</FormLabel>
          <Input  value={presentDatePost} onChange={(e) => setPresentDatePost(e.target.value)} />
        </FormControl> */}
        <div class='mb-3 flex flex-col mt-2'>
          <div>
            <label class='form-label fs-6 fw-semibold'>
            Date of Present Substansive post<sup className='text-danger'>*</sup>
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
              selected={presentDatePost ? new Date(presentDatePost) : null}
              onChange={(date) => {
                if (date instanceof Date && !isNaN(date)) {
                  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                  setPresentDatePost(formattedDate);
                } else {
                  setPresentDatePost('');
                }
              }}
              dateFormat='yyyy-MM-dd'
              className='form-control rounded-0'
              id='exampleFormControlInput1'
              placeholder=''
              shouldCloseOnSelect={true}
          />
          </div>
        <FormControl isRequired my='5'>
          <FormLabel color={"#515B6F"}>Unapproved Absence during review period</FormLabel>
          <Input  value={unApproved} onChange={(e) => setUnapproved(e.target.value)} />
        </FormControl>
        {/* <FormControl isRequired my='5'>
          <FormLabel color={"#515B6F"}>Confirmation of appointment date</FormLabel>
          <Input  value={confirmedDat} onChange={(e) => setSalary(e.target.value)} />
        </FormControl> */}
        <div class='mb-3 flex flex-col mt-2'>
          <div>
            <label class='form-label fs-6 fw-semibold'>
            Confirmation of appointment date<sup className='text-danger'>*</sup>
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
              selected={confirmedDate ? new Date(confirmedDate) : null}
              onChange={(date) => {
                if (date instanceof Date && !isNaN(date)) {
                  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                  setConfirmedDate(formattedDate);
                } else {
                  setConfirmedDate('');
                }
              }}
              dateFormat='yyyy-MM-dd'
              className='form-control rounded-0'
              id='exampleFormControlInput1'
              placeholder=''
              shouldCloseOnSelect={true}
          />
          </div>
        <button
          onClick={handleNavigate}
          style={{
            backgroundColor: " #984779",
            borderColor: "white",
            right: 50,
            position: "absolute",
          }}
          className='my-10 p-2 text-md-start text-white fs-6 fw-semibold'>
        Proceed to Next
        </button>
      </Box>

      </form>
    </Box>
  );
};

export default SpadevApplication;
