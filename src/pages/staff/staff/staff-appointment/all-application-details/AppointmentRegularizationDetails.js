import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import {
  TabIndicator,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/tabs";
import { Avatar } from '@chakra-ui/react'
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
} from "@chakra-ui/layout";
import api from "../../../../../api";
import { useSnackbar } from "notistack";
import { MoonLoader } from "react-spinners";

const AppointmentRegularizationDetails = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      api.getRegularizationbyID(id)
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
      <div
        id='no-padding-res'
        className='d-flex flex-wrap mt-3 align-items-center justify-content-between'>
        <Link
          style={{ cursor: "pointer", marginLeft: "-12px" }}
          onClick={() => navigate(-1)}
          className='d-flex align-items-center gap-2'>
          <BsArrowLeftShort size={"40"} />
          <p className=' fs-5 mt-3 '>Applicant Details</p>
        </Link>
      </div>
      <Flex gap='5'>
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
                <Text m='0' color='#7C8493'>
                {formatshortDate(details.date || "Application Date not available")}
                </Text>
              </Flex>
              <Divider />

              <Text fontWeight='medium' color='#25324B'>
              Regularization of Appointment
              </Text>
            </Box>
            <Divider />
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
          
        </Box>
        <Box
          h={"fit-content"}
          pb='20'
          px='5'
          className='col-lg-7 border  tb-res-parent'>
          {/* <div className='tb-res'> */}
          <Tabs position='relative' variant={"line"} pt={"2"}>
            <Box className='tab-scroll' overflowX={"auto"}>
              <Box className='tb-res-2' position={"relative"}>
                <TabList className='border-bottom'>
                  <Tab
                    _focus={{ color: "black" }}
                    fontWeight={"semibold"}
                    color={"gray"}>
                    Applicant Information
                  </Tab>
                  <Tab
                    _focus={{ color: "black" }}
                    fontWeight={"semibold"}
                    color={"gray"}>
                    Document
                  </Tab>
                </TabList>
                <TabIndicator
                  mt='-1.5px'
                  height='3px'
                  borderRadius='9px 9px 0 0'
                />
              </Box>
            </Box>
            <TabPanels>
              <TabPanel>
                <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                  <GridItem w='100%' h='10'>
                    <Text fontSize={"lg"} color='#7C8493' m='0'>
                      Full Name
                    </Text>
                    <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
                    {details.full_name}
                    </Text>
                  </GridItem>
                  <GridItem w='100%' h='10'>
                    <Text fontSize={"lg"} color='#7C8493' m='0'>
                     Staff Type
                    </Text>
                    <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
                    {details.staff_type}
                    </Text>
                  </GridItem>
                  <GridItem w='100%' h='10'>
                    <Text fontSize={"lg"} color='#7C8493' m='0'>
                    PF/CM No{" "}
                    </Text>
                    <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
                    {details.pf_no}
                    </Text>
                  </GridItem>
                  <GridItem w='100%' h='10'>
                    <Text fontSize={"lg"} color='#7C8493' m='0'>
                    Current Level{" "}
                    </Text>
                    <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
                    {details.level}
                    </Text>
                  </GridItem>
                  <GridItem w='100%' h='10'>
                    <Text fontSize={"lg"} color='#7C8493' m='0'>
                    Date of First Appointment{" "}
                    </Text>
                    <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
                    {formatDate(details.date_of_first_appointment)}
                    </Text>
                  </GridItem>
                  <GridItem w='100%' h='10'>
                    <Text fontSize={"lg"} color='#7C8493' m='0'>
                      Division/Department/Unit
                    </Text>
                    <Text fontSize={"md"} color='#25324B' fontWeight={"medium"}>
                    {details.department?.name || details.faculty?.name || details.unit?.name}
                    </Text>
                  </GridItem>
                  <GridItem w='100%' h='10'>
                    <Text fontSize={"lg"} color='#7C8493' m='0'>
                    Grade on Temporary Appointment
                    </Text>
                    <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
                    {details.grade_on_temporary_appointment}
                    </Text>
                  </GridItem>
                  <GridItem w='100%' h='12' >
                    <Text fontSize={"lg"} color='#7C8493' m='0' mt='5'>
                    Regularization of appointment form
                    </Text>
                    <Text fontSize={"md"} color='#25324B' fontWeight={"medium"}>
                    {details.regularization_of_appointment_form}
                    </Text>
                  </GridItem>
                  <GridItem w='100%' h='12'>
                    <Text fontSize={"md"} color='#7C8493' m='0'>
                    Details of work done since Appointment
                    </Text>
                    <Text fontSize={"sm"} color='#25324B' fontWeight={"medium"}>
                      {details.details_of_work_done_since_appointment}
                    </Text>
                  </GridItem>
                  
                </Grid>
              </TabPanel>
              <TabPanel>Document</TabPanel>
            </TabPanels>
          </Tabs>
          {/* </div> */}
        </Box>
      </Flex>
    </Stack>
  );
};

export default AppointmentRegularizationDetails;