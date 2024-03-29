import { Box, Button, Input, Text, CircularProgress,Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody   } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import GetDocument from "../../../../../components/getdocument";
import { VscCopy } from "react-icons/vsc";
import { HiOutlineDownload } from "react-icons/hi";
import CommonButton from "../../../../../components/commonbutton/Button";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../../../api";
import { useSnackbar } from "notistack";

const WithdrawalThirdPage = ({ formValues, formData }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  console.log("third values",formValues, formData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [contactAddress, setContactAddress] = useState("");
  const [nextOfKin, setNextOfKin] = useState("");

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

  // const handleSubmit = () => {
  //   setIsSubmitting(true);
  //   setIsDrawerOpen(true);
  //   setTimeout(() => {
  //     setIsSubmitting(false);
  //     setIsDrawerOpen(false);
  //     navigate("success-submit")
  //   }, 2000);
  // };

  const handleSubmit = async () =>  {
    setIsSubmitting(true);
    setIsDrawerOpen(true);
    try {
      const response = await api.appointmentWithdrawal({
        full_name: formValues.full_name,
        date_of_birth: formValues.dateOfBirth,
        designation: formData.rank,
        grade_leavel: formData.gradeValue,
        staff_type: formValues.type,
        pf_no: formData.staffPf,
        rsa_pin: formData.rsaPin,
        effective_date_of_exit_from_the_college: formData.formattedExitDate,
        date_of_assumption_of_duty: formData.formattedAssumptionDate,
        residential_address_in_lasucom: formData.address,
        pension_fund_administration: formData.pensionFund,
        contact_address: contactAddress,
        next_of_kin: nextOfKin,
        salary_scale: formData.salaryScale,
        faculty_id: formValues.facultyId,
        department_id: formValues.departmentId,
        unit_id: formValues.unitId,
        level: formValues.staffLevel,
        appointment_type: formData.appointmentType,
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
                Contact address after exit from college<sup className='text-danger'>*</sup>
              </label>
              <textarea className='form-control rounded-0' value={contactAddress} onChange={(e) => setContactAddress(e.target.value)}></textarea>
            </div>
            <div class='form-group mt-2'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Next of Kin/Beneficiary<sup className='text-danger'>*</sup>
              </label>
              <input
                type='text'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                id='exampleFormControlInput1'
                placeholder=''
                value={nextOfKin} onChange={(e) => setNextOfKin(e.target.value)}
              />
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
                  <p className='fs-6 fw-semibold'>Clearance Form</p>
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

export default WithdrawalThirdPage;
