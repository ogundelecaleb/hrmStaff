import { Button, Input, Text, CircularProgress,Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody   } from "@chakra-ui/react";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useSnackbar } from "notistack";
import "react-datepicker/dist/react-datepicker.css";
import CommonButton from "../../../../../components/commonbutton/Button";
import api from "../../../../../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from 'date-fns';

const RegularizationAppointmentJunior = ({ data,datas }) => {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [workDone, setWorkDone] = useState("");
  const [grade, setGrade] = useState("");
  const [appointDate, setAppointDate] = useState("");

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

  const formattedRegularDate = appointDate
  ? new Date(appointDate).toISOString().split('T')[0]
  : null;

  const handleSubmit = async () =>  {
    setIsSubmitting(true);
    setIsDrawerOpen(true);
    try {
      const response = await api.createNewRegularization({
        full_name: data.full_name,
        staff_type: data.type,
        pf_no: datas.pfNumber,
        date_of_first_appointment: datas.formattedAppointDate,
        grade_on_temporary_appointment: grade,
        details_of_work_done_since_appointment: workDone,
        faculty_id: datas.facultyId,
        department_id: datas.departmentId,
        date_on_temporary_appointment: formattedRegularDate,
        unit_id: datas.unitId,
        level: data.staffLevel,
        // regularization_of_appointment_form:uploadedDocuments,
      });  
      console.log("responce==>>>>>", response);
      enqueueSnackbar('Application successfull', { variant: 'success' })
      setIsSubmitting(false);
      setIsDrawerOpen(false);
      navigate("success-submit")
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || "An error occurred", {
        variant: "error",
      });
      setIsSubmitting(false);
      setIsDrawerOpen(false);
    }
  };

  return (
    <div className='container'>
      <div className='border-bottom pt-2 px-5'>
        <p className='fs-3 fw-semibold'>Regularization of Appointment</p>
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
                Grade on Temporary Appointment
                <sup className='text-danger'>*</sup>
              </label>
              <input
                type='text'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                id='exampleFormControlInput1'
                placeholder=''
                required value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </div>
            <div class='mb-3 flex flex-col mt-4'>
              <div>
                <label class='form-label fs-6 fw-semibold'>
                Date on Temporary Appointment<sup className='text-danger'>*</sup>
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
                  selected={appointDate ? new Date(appointDate) : null}
                  onChange={(date) => {
                    if (date instanceof Date && !isNaN(date)) {
                      const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                      setAppointDate(formattedDate);
                    } else {
                      setAppointDate('');
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
                Details of work done since Appointment
                <sup className='text-danger'>*</sup>
              </label>
              <textarea className='form-control rounded-0' required value={workDone}
            onChange={(e) => setWorkDone(e.target.value)}></textarea>
            </div>
          </form>
        </div>
        <div className='col-lg-6'> </div>
      </div>
      {/* <div className='row px-5'>
          <div className='col-lg-5'>
              <div
                  className='mt-4 d-flex justify-content-start'
                  style={{ flexDirection: "column" }}>
                  <p className='fs-6 fw-semibold'>Regularization of Appointment Form</p>
                  <div>
                  <Button rightIcon={<HiOutlineDownload size='20'/>}
                      className='btn py-2 px-4 me-2  text-white rounded-0'
                      style={{ backgroundColor: "#984779", marginTop: "-10px" }} onClick={downloadForm}>
                      Download
                  </Button>
                  </div>
              </div>
          <div>
          <GetDocument
          Icon={<VscCopy size={40} color='#5542F6' />}
          width={"433px"}
          height={"130px"}
          details={"Click to upload documents or drag and drop PDF"}
          onUpload={uploadDocument}
          />
          </div>
          </div>   
      </div> */}
      <div className='py-5'>
      
          <CommonButton title={"Submit"} action={handleSubmit} />
      
      </div>

      <Drawer isOpen={isDrawerOpen} size="full">
          <DrawerOverlay />
          <DrawerContent class='d-flex justify-content-center align-items-center'>
          <DrawerCloseButton />
          <DrawerHeader>
              
          </DrawerHeader>
          <DrawerBody class='d-flex flex-column align-items-center justify-content-center'>
              <div>
              <div
                  class='d-flex justify-content-center align-items-center'
                  style={{ height: "90vh" }}>
                  <div class='d-flex flex-column align-items-center'>
                  <CircularProgress isIndeterminate color={"#5542F6"} size="100px" thickness="4px"/>
                  <Text textAlign="center" fontSize="xl" fontWeight="bold">
                      Submitting...
                  </Text>
                  </div>
              </div>
              </div>
              
          </DrawerBody>
          </DrawerContent>
      </Drawer>
    </div>
  );
};

export default RegularizationAppointmentJunior;
