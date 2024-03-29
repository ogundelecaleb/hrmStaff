import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { Avatar } from '@chakra-ui/react'
import {
  Box,
  Divider,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/layout";
import api from "../../../../../api";
import { useSnackbar } from "notistack";
import { MoonLoader } from "react-spinners";
import { reuseAbleColor } from "../../../../../components/Color";

const SpaDevApplicationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [toggle, setToggle] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      api.getSpadevbyID(id)
      .then(response => {
        const leaveData = response.data;
        setDetails(leaveData)
        console.log(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        enqueueSnackbar(error.message, { variant: 'error' })
        setIsLoading(false);
      });
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const appointmentTypeOptions = {
    temporary_appointment: "Temporary Appointment",
    contract_appointment: "Contract Appointment",
    casual_appointment: "Casual Appointment",
    permanent_appointment: "Permanent Appointment",
  };

  const formatshortDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
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
    <Stack className='container' pl='12'>
      <div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
          className='d-flex align-items-center gap-2'>
          <BsArrowLeftShort size={"40"} />
          <p className=' fs-5 mt-3 '>Applicant Details</p>
        </div>
      </div>
      <Flex className='gap-5'>
        <Box>
          <Box p='5' border='1px solid #D6DDEB  ' h='fit-content'>
            <Box className='d-flex gap-2 my-4'>
            <Flex>
                <Avatar src={details.user_image} size='xl' />
                  <Box ml='3'>
                    <Text fontWeight='bold'>
                      {details.full_name}
                    </Text>
                    <Text fontSize='sm'>{details.staffID}</Text>
                    <Text fontSize='sm'>{details.role}</Text>
                  </Box>
                </Flex>
            </Box>
            <Box className='py-2 px-3 ' style={{ backgroundColor: "#F8F8FD" }}>
              <Flex justifyContent={"space-between"}>
                <Text m='0' color='#25324B'>
                Date Applied: 
                </Text>
                <Text m='0' ml='1' color='#7C8493'>
                {formatshortDate(details.date || "Application Date not available")}
                </Text>
              </Flex>
              <Divider />

              <Text fontWeight='medium' color='#25324B'>
              SPADEV Application
              </Text>
            </Box>
            
            <Divider />
          </Box>
          {details.approvals?.map((approval, index) => (
              <Box key={index} p="5" border="1px solid #D6DDEB" h="fit-content" mt="7">
                <Flex justifyContent={"space-between"}>
                  <Text m='0' color='#25324B' className="fw-semibold fs-8">
                    {approval.role}
                  </Text>
                  <Text m='0' color='#7C8493'>
                    {formatDate(approval.date)}
                  </Text>
                </Flex>
                <Text color="#7C8493" className="text-muted">
                  {approval.comment || "No comment available"}
                </Text>
              </Box>
            ))}
        </Box>
        <div className='col-lg-7 border px-0 mb-5'>
          <div className='border-bottom d-flex gap-4 px-3'>
            <p
              className='fw-semibold pt-2 pb-1'
              onClick={() => setToggle(true)}
              style={{
                borderBottom: `${reuseAbleColor.pupple} 2px ${
                  toggle ? "solid" : ""
                }`,
                width: "150px",
                cursor: "pointer",
              }}>
              Applicant Information
            </p>
            {/* <p
              className='fw-semibold pt-2 pb-1'
              onClick={() => setToggle(false)}
              style={{
                borderBottom: `${reuseAbleColor.pupple} 2px ${
                  toggle ? "" : "solid"
                }`,
                width: "70px",
                cursor: "pointer",
              }}>
              Document
            </p> */}
          </div>
          {/* {!toggle && (
            <div className='row'>
              <h1>Document</h1>
            </div>
          )} */}
          {toggle && (
            <div className='row'>
              <div className='col-lg-6 px-4 pt-4'>
                <div>
                  <p className='fw-semibold fs-6'>Full Name</p>
                  <p
                    className='text-muted fs-6'
                    style={{ marginTop: "-15px" }}>
                  {details.full_name}
                  </p>
                </div>
                <div>
                  <p className='fw-semibold fs-6 mt-3'>
                    Division/Department/Unit
                  </p>
                  <p
                    className='text-muted' fontSize={"sm"}
                    style={{ marginTop: "-15px" }}>
                    {details.department?.name || details.faculty?.name || details.unit?.name}
                  </p>
                </div>
                <div>
                  <p className='fw-semibold fs-6'>Staff Type</p>
                  <p
                    className='text-muted fs-6'
                    style={{ marginTop: "-15px" }}>
                  {details.staff_type}
                  </p>
                </div>
                <div>
                  <p className='fw-semibold fs-6'>PF/CM No </p>
                  <p
                    className='text-muted fs-6'
                    style={{ marginTop: "-15px" }}>
                    {details.pf_no}
                  </p>
                </div>
                <div>
                  <p className='fw-semibold fs-6'>Date Of First Appointment</p>
                  <p
                    className='text-muted fs-6'
                    style={{ marginTop: "-15px" }}>
                    {formatshortDate(details.date_of_first_appointment || "Date not available")}
                  </p>
                </div>
                <div>
                  <p className='fw-semibold fs-6'>
                  Current Substantive post
                  </p>
                  <p
                    className='text-muted fs-6'
                    style={{ marginTop: "-15px" }}>
                   {details.current_substantive_post}
                  </p>
                </div>
                <div>
                  <p className='fw-semibold fs-6'>
                  Grade Level
                  </p>
                  <p
                    className='text-muted fs-6'
                    style={{ marginTop: "-15px" }}>
                    {details.grade_level}
                  </p>
                </div>
                <div>
                  <p className='fw-semibold fs-6'>
                  Grade Level/Step{" "}
                  </p>
                  <p
                    className='text-muted fs-6'
                    style={{ marginTop: "-15px" }}>
                    {details.step}
                  </p>
                </div>
                <div>
                  <p className='fw-semibold fs-6'>Designation of First Appointment</p>
                  <p
                    className='text-muted fs-6'
                    style={{ marginTop: "-15px" }}>
                    {details.designation_of_first_appointment}
                  </p>
                </div>
                <div>
                  <p className='fw-semibold fs-6'>Grade Level of First Appointment</p>
                  <p
                    className='text-muted fs-6'
                    style={{ marginTop: "-15px" }}>
                    {details.grade_level_of_first_appointment}
                  </p>
                </div>
                <div>
                  <p className='fw-semibold fs-6'>Confirmation of Appointment Date</p>
                  <p
                    className='text-muted fs-6'
                    style={{ marginTop: "-15px" }}>
                   {formatshortDate(details.confirmation_of_appointment_date || "Date not available")}
                  </p>
                </div>
              </div>
              <div className='col-lg-6 px-4 pt-4'>
                
                <div>
                  <p className='fw-semibold fs-6'>Position Sought</p>
                  <p
                    className='text-muted fs-6'
                    style={{ marginTop: "-15px" }}>
                    {details.position_sought}
                  </p>
                </div>
                <div>
                  <p className='fw-semibold' fontSize={"sm"}>Date of Present Substansive post</p>
                  <p
                    className='text-muted fs-6'
                    style={{ marginTop: "-15px" }}>
                    {formatshortDate(details.date_of_present_substantive_post || "Date not available")}
                  </p>
                </div>
                <div>
                  <p className='fw-semibold' fontSize={"sm"}>Unapproved Absence during review period</p>
                  <p
                    className='text-muted fs-6'
                    style={{ marginTop: "-15px" }}>
                    {details.unapproved_absence_during_review_period}
                  </p>
                </div>
                <div>
                  <p className='fw-semibold' fontSize={"sm"}>Key responsibilities during the period of the review</p>
                  <p
                    className='text-muted fs-6'
                    style={{ marginTop: "-15px" }}>
                    {details.key_responsibilities}
                  </p>
                </div>
                <div>
                  <p className='fw-semibold' fontSize={"sm"}>Factors hindered effectiveess on the job</p>
                  <p
                    className='text-muted fs-6'
                    style={{ marginTop: "-15px" }}>
                    {details.factors_hindered}
                  </p>
                </div>
                <div>
                  <p className='fw-semibold' fontSize={"sm"}>Proposed ways the factors be eliminated or overcome</p>
                  <p
                    className='text-muted fs-6'
                    style={{ marginTop: "-15px" }}>
                    {details.factors_be_eliminated}
                  </p>
                </div>
                <div>
                  <p className='fw-semibold' fontSize={"sm"}>Proposed ways to improve effectiveness on the job</p>
                  <p
                    className='text-muted fs-6'
                    style={{ marginTop: "-15px" }}>
                    {details.improve_your_effectiveness}
                  </p>
                </div>
                <div>
                  <p className='fw-semibold' fontSize={"sm"}>Outstanding achievements or value creating activities</p>
                  <p
                    className='text-muted fs-6'
                    style={{ marginTop: "-15px" }}>
                    {details.improve_your_effectiveness}
                  </p>
                </div>
                <div>
                  <p className='fw-semibold' fontSize={"sm"}>Personal developement undertaken during this period</p>
                  <p
                    className='text-muted fs-6'
                    style={{ marginTop: "-15px" }}>
                    {details.personal_development}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Flex>
    </Stack>
  );
};

export default SpaDevApplicationDetails;
