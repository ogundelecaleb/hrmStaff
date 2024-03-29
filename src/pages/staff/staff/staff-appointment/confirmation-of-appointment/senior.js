import { Box, Button, Input, Text, CircularProgress,Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody   } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { useSnackbar } from "notistack";
import GetDocument from "../../../../../components/getdocument";
import { VscCopy } from "react-icons/vsc";
import { HiOutlineDownload } from "react-icons/hi";
import CommonButton from "../../../../../components/commonbutton/Button";
import api from "../../../../../api";

const ConfirmationOfAppointmentSenior = ({ data, datas }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  // const [documents, setDocuments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [firstGrade, setIsFirstGrade] = useState("");
  // const [temporaryGrade, setIsTemporaryGrade] = useState("");
  const [presentGrade, setIsPresentGrade] = useState("");
  const [workDone, setWorkDone] = useState("");

  // const uploadDocument = (file) => {
  //   setDocuments([...documents, file.name]);
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
    try {

      const response = await api.createNewCONFIRMATION({
        full_name: data.full_name,
        staff_type: data.staffType,
        faculty_id: datas.facultyId,
        department_id: datas.departmentId,
        unit_id: datas.unitId,
        pf_no: datas.pfNumber,
        position: data.position,
        salary: data.salary,
        conunas: data.conunass,
        date_of_first_appointment: datas.formattedAppointDate,
        date_of_present_appointment: datas.formattedPresentDate,
        grade_of_present_appointment: presentGrade,
        grade_of_first_appointment: firstGrade,
        // grade_on_temporary_appointment: temporaryGrade,
        details_of_work_done_since_appointment: workDone,
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
    <div className='container'>
      <div className='border-bottom pt-2 px-5'>
        <p className='fs-3 fw-semibold'>Confirmation of Appointment</p>
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
                Grade of present appointment 
                <sup className='text-danger'>*</sup>
              </label>
              <input
                type='text'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                id='exampleFormControlInput1'
                placeholder=''
                required value={presentGrade}
                onChange={(e) => setIsPresentGrade(e.target.value)}
              />
            </div>
            <div class='form-group mt-2'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
               Grade of first appointment  
                <sup className='text-danger'>*</sup>
              </label>
              <input
                type='text'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                id='exampleFormControlInput1'
                placeholder=''
                required value={firstGrade}
                onChange={(e) => setIsFirstGrade(e.target.value)}
              />
            </div>
            {/* <div class='form-group mt-2'>
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
                required value={temporaryGrade}
                onChange={(e) => setIsTemporaryGrade(e.target.value)}
              />
            </div> */}
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
                  <p className='fs-6 fw-semibold'>Confrimation of Appointment Form</p>
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

export default ConfirmationOfAppointmentSenior;
