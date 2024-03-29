import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import { reuseAbleColor } from "../../../components/Color";
import { BsArrowLeftShort, BsPhone } from "react-icons/bs";
import { TbMessage } from "react-icons/tb";
import { AiFillLinkedin, AiOutlineMail } from "react-icons/ai";
// import JobApplicantTab from "../../adminpages/job-applicants/JobApplicantTab";
import {
  TabIndicator,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/tabs";

import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { BiMessageAltDetail } from "react-icons/bi";
import { AllApplicant } from "./AllApplicant";

const ApplicantsDetails = () => {
  const location = useLocation().state;
  const data = location.item;

  const navigate = useNavigate();

  const width = 75;

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
            <Box className='d-flex gap-3 my-4'>
              <div>
                <img
                  src='https://bit.ly/prosper-baba'
                  width={"80px"}
                  style={{ borderRadius: "50%" }}
                  alt='/'
                />
              </div>
              <div>
                <Text color='#25324B' className='fw-semibold fs-5'>
                  {data.applicant_name}
                </Text>
                <Text
                  color='#7C8493'
                  className='text-muted'
                  style={{ marginTop: "-17px" }}>
                  FT-12345
                </Text>
              </div>
            </Box>
            <Box className='py-2 px-3 ' style={{ backgroundColor: "#F8F8FD" }}>
              <Flex justifyContent={"space-between"}>
                <Text m='0' color='#25324B'>
                  Leave Applied{" "}
                </Text>
                <Text m='0' color='#7C8493'>
                  1 day ago
                </Text>
              </Flex>
              <Divider />

              <Text fontWeight='medium' color='#25324B'>
                Annual Leave{" "}
              </Text>
            </Box>
            <Box pt='10'>
              <Input
                h='16'
                borderRadius={"0"}
                border='1px solid #2D394C1A'
                placeholder='Add a comment...'
              />
              <Flex pt='5' gap='4'>
                <Button
                  h='12'
                  w='full'
                  borderRadius={"0"}
                  border='1px solid #2D394C1A'
                  bg='white'
                  color='#4640DE'>
                  Comment
                </Button>
                <Button
                  h='12'
                  w='16'
                  borderRadius={"0"}
                  border='1px solid #2D394C1A'
                  bg='white'
                  color='#4640DE'>
                  <BiMessageAltDetail />
                </Button>
              </Flex>
            </Box>

            <Divider />
          </Box>
          <Flex pt='10' w='full' justifyContent={"space-between"}>
            <Button borderRadius={"0"} color='#D02F44' bg='#F8F8FD'>
              Decline{" "}
            </Button>
            <Button borderRadius={"0"} color='white' bg='#388B41'>
              Approve{" "}
            </Button>
          </Flex>
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
                      Precious Akanle
                    </Text>
                  </GridItem>
                  <GridItem w='100%' h='10'>
                    <Text fontSize={"lg"} color='#7C8493' m='0'>
                      Leave Type
                    </Text>
                    <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
                      Precious Akanle
                    </Text>
                  </GridItem>
                  <GridItem w='100%' h='10'>
                    <Text fontSize={"lg"} color='#7C8493' m='0'>
                      Marital Status{" "}
                    </Text>
                    <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
                      Married{" "}
                    </Text>
                  </GridItem>
                  <GridItem w='100%' h='10'>
                    <Text fontSize={"lg"} color='#7C8493' m='0'>
                      Date of First Appointment{" "}
                    </Text>
                    <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
                      23rd January 2011
                    </Text>
                  </GridItem>
                  <GridItem w='100%' h='10'>
                    <Text fontSize={"lg"} color='#7C8493' m='0'>
                      Division/Department/Unit
                    </Text>
                    <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
                      Finance{" "}
                    </Text>
                  </GridItem>

                  <GridItem w='100%' h='10'>
                    <Text fontSize={"lg"} color='#7C8493' m='0'>
                      Leave due for Current year
                    </Text>
                    <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
                      January 2023{" "}
                    </Text>
                  </GridItem>
                  <GridItem w='100%' h='10'>
                    <Text fontSize={"lg"} color='#7C8493' m='0'>
                      Rank
                    </Text>
                    <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
                      Deputy Director{" "}
                    </Text>
                  </GridItem>
                  <GridItem w='100%' h='10'>
                    <Text fontSize={"lg"} color='#7C8493' m='0'>
                      Deferred Leave{" "}
                    </Text>
                    <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
                      None{" "}
                    </Text>
                  </GridItem>
                  <GridItem w='100%' h='10'>
                    <Text fontSize={"lg"} color='#7C8493' m='0'>
                      Salary Per Annum{" "}
                    </Text>
                    <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
                      ₦2,400,000
                    </Text>
                  </GridItem>
                  <GridItem w='100%' h='10'>
                    <Text fontSize={"lg"} color='#7C8493' m='0'>
                      Start Date
                    </Text>
                    <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
                      23rd January 2023{" "}
                    </Text>
                  </GridItem>
                  <GridItem w='100%' h='10'>
                    <Text fontSize={"lg"} color='#7C8493' m='0'>
                      Address when on Leave{" "}
                    </Text>
                    <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
                      Plot 54, Adejoye close, off Nepa Rd, Iyana Ipaja{" "}
                    </Text>
                  </GridItem>
                  <GridItem w='100%' h='10'>
                    <Text fontSize={"lg"} color='#7C8493' m='0'>
                      End Date
                    </Text>
                    <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
                      3rd March 2023{" "}
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

export default ApplicantsDetails;
