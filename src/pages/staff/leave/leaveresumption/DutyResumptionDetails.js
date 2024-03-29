import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftShort, BsPhone } from "react-icons/bs";
import { TbMessage } from "react-icons/tb";
import { AiFillLinkedin, AiOutlineMail } from "react-icons/ai";
import {
  TabIndicator,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/tabs";
import { Badge, Avatar } from '@chakra-ui/react'
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
import { reuseAbleColor } from "../../../../components/Color";
import { useState } from "react";

const DutyResumptionDetails = () => {
  const [toggle, setToggle] = useState(true);
  const location = useLocation().state;
  const navigate = useNavigate();
  const data = location.item;
  //   reuseAbleColor
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
                <Avatar src='https://bit.ly/sage-adebayo' size='xl' />
                <Box ml='3'>
                  <Text fontWeight='bold'>
                    Precious Akanle
                  </Text>
                  <Text fontSize='sm'>MLXU_286</Text>
                  <Text fontSize='sm'>UI Engineer</Text>
                </Box>
              </Flex>
            </Box>
            <Box className='py-2 px-3 ' style={{ backgroundColor: "#F8F8FD" }}>
              <Flex justifyContent={"space-between"}>
                <Text m='0' color='#25324B'>
                Date Applied: 
                </Text>
                <Text m='0' color='#7C8493'>
                  2 day ago
                </Text>
              </Flex>
              <Divider />

              <Text fontWeight='medium' color='#25324B'>
              Withdrawal of Appointment
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
            <p
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
            </p>
          </div>
          {!toggle && (
            <div className='row'>
              <h1>Document</h1>
            </div>
          )}
          {toggle && (
            <div className='row'>
              <div className='col-lg-6 px-4 pt-4'>
                <div>
                  <p className='text-muted fs-6'>Full Name</p>
                  <p
                    className='fw-semibold fs-6'
                    style={{ marginTop: "-15px" }}>
                    {data.name}
                  </p>
                </div>
                <div>
                  <p className='text-muted fs-6 mt-3'>Faculty</p>
                  <p
                    className='fw-semibold fs-6'
                    style={{ marginTop: "-15px" }}>
                    Basic Medical Science
                  </p>
                </div>
                <div>
                  <p className='text-muted fs-6 mt-3'>
                    Division/Department/Unit
                  </p>
                  <p
                    className='fw-semibold fs-6'
                    style={{ marginTop: "-15px" }}>
                    Finance
                  </p>
                </div>
                <div>
                  <p className='text-muted fs-6'>PF/CM No </p>
                  <p
                    className='fw-semibold fs-6'
                    style={{ marginTop: "-15px" }}>
                    5564826
                  </p>
                </div>
                <div>
                  <p className='text-muted fs-6'>Date Of Appointment</p>
                  <p
                    className='fw-semibold fs-6'
                    style={{ marginTop: "-15px" }}>
                    1st January 2023
                  </p>
                </div>
                <div>
                  <p className='text-muted fs-6'>
                    Grade on Temporary Appointment
                  </p>
                  <p
                    className='fw-semibold fs-6'
                    style={{ marginTop: "-15px" }}>
                    14
                  </p>
                </div>
                <div>
                  <p className='text-muted fs-6'>
                    Grade on Temporary Appointment
                  </p>
                  <p
                    className='fw-semibold fs-6'
                    style={{ marginTop: "-15px" }}>
                    14
                  </p>
                </div>
                <div>
                  <p className='text-muted fs-6'>
                    Details on work done since Appointment{" "}
                  </p>
                  <p
                    className='fw-semibold fs-6'
                    style={{ marginTop: "-15px" }}>
                    List of work done below
                  </p>
                </div>
              </div>
              <div className='col-lg-6 px-4 pt-4'>
                <div>
                  <p className='text-muted fs-6'>Staff Type</p>
                  <p
                    className='fw-semibold fs-6'
                    style={{ marginTop: "-15px" }}>
                    Senior Staff{" "}
                  </p>
                </div>
                <div>
                  <p className='text-muted fs-6'>Pension Fund Administration</p>
                  <p
                    className='fw-semibold fs-6'
                    style={{ marginTop: "-15px" }}>
                    Certified{" "}
                  </p>
                </div>
                <div>
                  <p className='text-muted fs-6'>Date of Assumption of Duty</p>
                  <p
                    className='fw-semibold fs-6'
                    style={{ marginTop: "-15px" }}>
                    2 August 2010{" "}
                  </p>
                </div>
                <div>
                  <p className='text-muted fs-6'>Effective Date of Exit from the College</p>
                  <p
                    className='fw-semibold fs-6'
                    style={{ marginTop: "-15px" }}>
                    23 September 2023{" "}
                  </p>
                </div>
                <div>
                  <p className='text-muted fs-6'>Residential Addresst in Lasucom</p>
                  <p
                    className='fw-semibold fs-6'
                    style={{ marginTop: "-15px" }}>
                    23 Allen Avenue{" "}
                  </p>
                </div>
                <div>
                  <p className='text-muted fs-6'>Contact Address</p>
                  <p
                    className='fw-semibold fs-6'
                    style={{ marginTop: "-15px" }}>
                    16 Toyin street ikeja{" "}
                  </p>
                </div>
                <div>
                  <p className='text-muted fs-6'>Next of Kin/Beneficiary</p>
                  <p
                    className='fw-semibold fs-6'
                    style={{ marginTop: "-15px" }}>
                    Adenigba Moses{" "}
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

export default DutyResumptionDetails;
