import { Box, Button, Text, CircularProgress,Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody   } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useSnackbar } from "notistack";
import "react-datepicker/dist/react-datepicker.css";
import GetDocument from "../../../../../../components/getdocument";
import { VscCopy } from "react-icons/vsc";
import { HiOutlineDownload } from "react-icons/hi";
import CommonButton from "../../../../../../components/commonbutton/Button";
import api from "../../../../../../api";
import { getYear, getMonth } from 'date-fns';

const AdhocSenior = ({data, datas}) => {
  const navigate = useNavigate();
  console.log(data);
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateAssumed, setDateAssumed] = useState('');
  // const [dateEffected, setDateEffected] = useState('');
  const [step, setStep] = useState('');
  const [address, setAddress] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [uploadedDocuments, setUploadedDocuments] = useState([]);
  // const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);

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

  // const onFileChanges = (e) => {
  //   const selectedFile = e.target.files[0];
  //   if (selectedFile) {
  //     const fileType = selectedFile.type;
  //     if (fileType === 'application/pdf' || fileType === 'image/jpeg') {
  //       setUploadedDocuments(selectedFile);
  //       setIsDocumentUploaded(true);
  //     } else {
  //       enqueueSnackbar('Please select a valid PDF or JPEG file.', { variant: 'error' });
  //     }
  //   }
  // };

  // const downloadForm = () => {
  //   const url = "../../../../lasucom-docs/NASE-certificate-of-resumption.pdf";
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = 'NASE-certificate-of-resumption.pdf';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const handleSubmit = async () =>  {

    setIsSubmitting(true);
    setIsDrawerOpen(true);

    const formattedAppointDate = dateAssumed
      ? new Date(dateAssumed).toISOString().split("T")[0]
      : null;

    try {

      const response = await api.registerNewAppointment({
        full_name: data.full_name,
        appointment_type: datas.appointmentType,
        staff_type: data.staffType,
        faculty_id: datas.facultyId,
        department_id: datas.departmentId,
        unit_id: datas.unitId,
        position: data.position,
        salary: datas.salary,
        conunas: data.conunass,
        step: step,
        residential_address: address,
        date_of_assumption_of_duty: formattedAppointDate,
        // effect_date_of_assumption:dateAssumed,
        // form_upload:uploadedDocuments,
        level: data.staffLevel,
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
    <div className='container-fluid'>
      <p className='py-3 fs-4 fw-semibold border-bottom px-4'>
        Certification of Assumption of Duty
      </p>
      <div className='row px-4'>
        <div className='col-lg-6'>
          <form>
            <div class='form-group mt-2'>
              <label className='fw-semibold fs-6 mt-3 mb-2'>
                Residential Address<sup className='text-danger'>*</sup>
              </label>
              <input
                type='text'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div class='form-group mt-2'>
              <label className='fw-semibold fs-6 mt-3 mb-2'>
              Grade Level/Step<sup className='text-danger'>*</sup>
              </label>
              <input
                type='text'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                onChange={(e) => setStep(e.target.value)} 
              />
            </div>
            {/* <div class='mb-3 flex flex-col mt-4'>
              <div>
                <label class='form-label fs-6 fw-semibold'>Effective Date of Appointment<sup className='text-danger'>*</sup></label>
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
                    selected={dateEffected ? new Date(dateEffected) : null}
                    onChange={(date) => {
                      if (date instanceof Date && !isNaN(date)) {
                        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                        setDateEffected(formattedDate);
                      } else {
                        setDateEffected('');
                      }
                    }}
                    dateFormat='yyyy-MM-dd'
                    className='form-control rounded-0'
                    id='exampleFormControlInput1'
                    placeholder=''
                    shouldCloseOnSelect={true}
                  />
            </div> */}
            <div class='mb-3 flex flex-col mt-2'>
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
                    selected={dateAssumed ? new Date(dateAssumed) : null}
                    onChange={(date) => {
                      if (date instanceof Date && !isNaN(date)) {
                        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                        setDateAssumed(formattedDate);
                      } else {
                        setDateAssumed('');
                      }
                    }}
                    dateFormat='yyyy-MM-dd'
                    className='form-control rounded-0'
                    id='exampleFormControlInput1'
                    placeholder=''
                    shouldCloseOnSelect={true}
                  />
            </div>
          </form>
        </div>
      </div>
      {/* <div className='row px-4'>
          <div className='col-lg-5'>
              <div
                  className='mt-4 d-flex justify-content-start'
                  style={{ flexDirection: "column" }}>
                  <p className='fs-6 fw-semibold'>Assumption of Duty Form</p>
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
          onUpload={onFileChanges}
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

export default AdhocSenior;
