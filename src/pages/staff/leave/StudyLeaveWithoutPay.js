import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../../api";
import { MoonLoader } from "react-spinners";
import 'intl';
import 'intl/locale-data/jsonp/en';
import { getYear, getMonth } from 'date-fns';
import {
  Box,
} from "@chakra-ui/react";
import Oops from '../../../components/Opps';

const StudyLeaveWithoutPay = ({ navigate }) => {
  
  const location = useLocation();

  const {
    fullName,
    maritalStatus,
    departmentOrUnitOrFacultyID,
    dateOfFirstAppointment,
    rankDesignation,
    selectedLeaveType,
    staffType,
    staffLevel
  } = location.state;

  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [addressLeave, setAddressLeave] = useState('');
  const [leaveNumber, setLeaveumber] = useState('');
  const [staffRep, setStaffrep] = useState('');
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(null);
  const [resumptionDate, setResumptionDate] = useState(null);
  const [leaveDuration, setLeaveDuration] = useState('');
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [completedFirstSection, setCompletedFirstSection] = useState(false);
  const [isStaffModal, setIsStaffModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [staffs, setStaffs] = useState([]);

  async function fetchStaffs() {
    try {
      const staffs = await api.fetchStaffs();
      console.log("Staff Details:", staffs);
      setStaffs(staffs);
    } catch (error) {
      console.error("Error fetching your basic details", error);
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchStaffs();
  }, []);

  console.log(fullName,maritalStatus,departmentOrUnitOrFacultyID,dateOfFirstAppointment,rankDesignation,selectedLeaveType,addressLeave,staffRep);

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

  const handleProceed = () => {
    if (completedFirstSection) {
      setShowAdditionalInfo(true);
    } else {
      setCompletedFirstSection(true);
    }
  };

  const calculateDates = (selectedStartDate) => {
    if (selectedStartDate instanceof Date && !isNaN(selectedStartDate)) {
      const calculatedEndDate = new Date(selectedStartDate);
      calculatedEndDate.setDate(selectedStartDate.getDate() + 180);

      const calculatedResumptionDate = new Date(calculatedEndDate);
      calculatedResumptionDate.setDate(calculatedEndDate.getDate() + 1);

      setEndDate(calculatedEndDate.toISOString().split('T')[0]);
      setResumptionDate(calculatedResumptionDate.toISOString().split('T')[0]);
      setLeaveDuration(180);
    }
  };

  const onFileChanges = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (fileType === 'application/pdf' || fileType === 'image/jpeg') {
        setUploadedDocuments(selectedFile);
        setIsDocumentUploaded(true);
      } else {
        enqueueSnackbar('Please select a valid PDF or JPEG file.', { variant: 'error' });
      }
    }
  }; 

  async function handleSubmit (e)  {
    e.preventDefault();
    setIsLoading(true);
    if (!isDocumentUploaded) {
      enqueueSnackbar('Please upload a document', { variant: 'error' });
      setIsLoading(false);
      return;
    }
    const formattedStartDate = startDate
    ? new Date(startDate).toISOString().split('T')[0]
    : null;

    let departmentId = "";
    let facultyId = "";
    let unitId = "";

    if (rankDesignation === 'HOD' || rankDesignation === 'RSWEP') {
      departmentId = departmentOrUnitOrFacultyID;
    } else if (rankDesignation === 'DEAN') {
      facultyId = departmentOrUnitOrFacultyID;
    } else if (rankDesignation === 'HOU' || rankDesignation === 'NTSWEP') {
      unitId = departmentOrUnitOrFacultyID;
    }

    const formData = new FormData();
    formData.append('upload_documents', uploadedDocuments);
    formData.append('full_name', fullName);
    formData.append('marital_status', maritalStatus);
    formData.append('department_id', departmentId);
    formData.append('faculty_id', facultyId);
    formData.append('unit_id', unitId);
    formData.append('leave_type', selectedLeaveType);
    formData.append('date_of_first_appointment', dateOfFirstAppointment);
    formData.append('designation', rankDesignation);
    formData.append('start_date', formattedStartDate);
    formData.append('end_date', endDate);
    formData.append('leave_address', addressLeave);
    formData.append('leave_phone', leaveNumber);
    formData.append('replacement_on_duty', staffRep);
    formData.append('resumption_date', resumptionDate);
    formData.append('leave_duration', leaveDuration);
    formData.append('type', staffType);
    formData.append('level', staffLevel);

    try {
      const response = await api.requestLeave(formData);
      console.log("responce==>>>>>", response);
      enqueueSnackbar('Leave Application successfull', { variant: 'success' })
      setIsLoading(false);
      navigate("submited");
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error.message, { variant: 'error' })
      setIsLoading(false);
    }
  };


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
            style={{ paddingBottom: "100px" }} onSubmit={handleSubmit}>
            
            <div class='pb-5' style={{ display: !showAdditionalInfo ? "block" : "none" }}>
                <div class='pb-2 pt-2'>
                <div class='mb-3 flex flex-col'>
                  <div>
                    <label class='form-label fs-6 fw-semibold'>Start Date<sup className='text-danger'>*</sup></label>
                  </div>
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
                    selected={startDate ? new Date(startDate) : null}
                    onChange={(date) => {
                      if (date instanceof Date && !isNaN(date)) {
                        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                        setStartDate(formattedDate);
                        calculateDates(date);
                      } else {
                        setStartDate('');
                        setEndDate(null);
                        setResumptionDate(null);
                      }
                    }}
                    dateFormat='yyyy-MM-dd'
                    className='form-control rounded-0 '
                    id='exampleFormControlInput1'
                   
                  />
                </div>
              </div>
              <div class='mb-3 flex flex-col'>
                <div>
                  <label class='form-label fs-6 fw-semibold'>End Date: {endDate}</label>
                </div>              
              </div>
              <div class='mb-3 flex flex-col'>
                <div>
                  <label class='form-label fs-6 fw-semibold'>Resumption Date: {resumptionDate}</label>
                </div>              
              </div>
              <div class='mb-3'>
                <label
                  for='exampleInputEmail1'
                  class='form-label fs-6 fw-semibold h-10'>
                  Phone Number while on Leave
                </label>
                <input class='form-control rounded-0'  value={leaveNumber} onChange={(e) => setLeaveumber(e.target.value)}/>
              </div>
              
              <button
                type='button'
                onClick={handleProceed}
                style={{
                  backgroundColor: " #984779",
                  borderColor: "white",
                  right: 50,
                  position: "absolute",
                }}
                class='my-10 p-2 text-md-start text-white fs-6 fw-semibold'>
                Proceed to Next
              </button>
            </div>
            
            <div class='pb-5'style={{ display: showAdditionalInfo ? "block" : "none" }}>

              <div class='mb-3'>
                <label for='address' class='form-label fs-6 fw-semibold'>
                  Address while on Leave
                </label>
                <textarea
                  class='form-control'
                  aria-label='With textarea' value={addressLeave}
                  onChange={(e) => setAddressLeave(e.target.value)}></textarea>
              </div>

              <div class='mb-3'>
                <label class='form-label fs-6 fw-semibold'>
                  To be relieved by(Name of Staff)
                </label>
                <input class='form-control rounded-0' value={staffRep}
                onChange={(e) => setStaffrep(e.target.value)}/>
              </div>
              <div className='mb-3'>
                <label
                  style={{ marginBottom: '10px' }}
                  className='form-label fs-6 fw-semibold h-10'>
                  Upload your documents<sup className='text-danger'>*</sup>
                </label>
                <input
                  type="file"
                  className="form-control rounded-0"
                  id={`upload_documents`}
                  onChange={onFileChanges}
                />
                <sup className='text-danger'>Format accepted: Jpeg/Pdf</sup>
              </div>
              <button
                disabled={isLoading}
                type='submit' 
                style={{
                  backgroundColor: " #984779",
                  borderColor: "white",
                  right: 50,
                  position: "absolute",
                }}
                className='my-10 p-2 text-md-start text-white fs-6 fw-semibold'>
                {isLoading ? (
                    <MoonLoader color={"white"} size={20} />
                  ) : ( <>Submit</>
                  )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StudyLeaveWithoutPay;