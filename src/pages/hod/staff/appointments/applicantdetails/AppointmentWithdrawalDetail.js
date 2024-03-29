import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import {
  TabIndicator,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/tabs";
import { BiMessageAltDetail } from "react-icons/bi";
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
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import api from "../../../../../api";
import { useSnackbar } from "notistack";
import { MoonLoader } from "react-spinners";
import { reuseAbleColor } from "../../../../../components/Color";
import { getUserDetails } from "../../../../../utils/utils";

const AppointmentWithrawalDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [toggle, setToggle] = useState(true)
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingd, setIsLoadingd] = useState(false);
  const [isLoadinge, setIsLoadinge] = useState(false);
  const [details, setDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isCommentDisplayed, setIsCommentDisplayed] = useState(false);

  const handleCommentSubmit = () => {
    if (commentText.trim() !== "") {
      setComments([...comments, commentText]);
      setIsCommentDisplayed(true);
    }
    console.log("commets", commentText);
  };

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      api.getWithdrawalbyID(id)
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

  async function fetchUserDetails() {
    try {
      const userDetails = await getUserDetails();
      console.log("User Details:", userDetails);
      setUserDetails(userDetails)
      
    } catch (error) {
      console.error("Error fetching your basic details", error);
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }
  useEffect(() => {
    fetchUserDetails();
  }, []);

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

  const shouldDisplayButtons = !details.approvals || !details.approvals.some(
    (approval) => approval.role === userDetails?.data?.role && (approval.status === "approved" || approval.status === "declined")
  );

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
  };

  async function handleApprovedBtn (e)  {
    e.preventDefault();
    if (!isCommentDisplayed) {
      enqueueSnackbar("Please add a comment before before Accepting.", {
        variant: "warning",
      });
      return;
    } 
    setIsLoadinge(true);
    try {
      const response = await api.handleWithdrawalApprove({id,status: "approved",comment: commentText})
      console.log("responce==>>>>>", response);
      enqueueSnackbar("Application approved successfully", { variant: 'success' })
      setIsLoadinge(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoadinge(false);
    }
  }

  async function handleDeclinedBtn (e)  {
    e.preventDefault();
    if (!isCommentDisplayed) {
      enqueueSnackbar("Please add a comment before before declining.", {
        variant: "warning",
      });
      return;
    } 
    setIsLoadingd(true);
    try {
      const response = await api.handleWithdrawalDecline({id,status: "declined",comment: commentText})
      console.log("responce==>>>>>", response);
      enqueueSnackbar("Application declined successfully", { variant: 'success' })
      setIsLoadingd(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoadingd(false);
    }
  }

  return (
    <Stack className="container" pl="12">
      <div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
          className="d-flex align-items-center gap-2"
        >
          <BsArrowLeftShort size={"40"} />
          <p className=" fs-5 mt-3 ">Applicant Details</p>
        </div>
      </div>
      <Flex className="gap-5">
        <Box>
          <Box p="5" border="1px solid #D6DDEB  " h="fit-content">
            <Box className="d-flex gap-2 my-4">
              <Flex>
                <Avatar src={details.user_image} size="xl" />
                <Box ml="3">
                  <Text fontWeight="bold">{details.full_name}</Text>
                  <Text fontSize="sm">{details.staffID}</Text>
                  <Text fontSize="sm">{details.role}</Text>
                </Box>
              </Flex>
            </Box>
            <Box className="py-2 px-3 " style={{ backgroundColor: "#F8F8FD" }}>
              <Flex justifyContent={"space-between"}>
                <Text m="0" color="#25324B">
                  Date Applied:
                </Text>
                <Text m="0" color="#7C8493">
                  {formatshortDate(
                    details.date || "Application Date not available"
                  )}
                </Text>
              </Flex>
              <Divider />

              <Text fontWeight="medium" color="#25324B">
                Withdrawal of Appointment
              </Text>
            </Box>
            {!isCommentDisplayed && (
              <>
                <Box pt="10">
                  <Input
                    h="16"
                    borderRadius={"0"}
                    border="1px solid #2D394C1A"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <Flex pt="5" gap="4">
                    <Button
                      h="12"
                      w="full"
                      borderRadius={"0"}
                      border="1px solid #2D394C1A"
                      bg="white"
                      color="#4640DE"
                      onClick={handleCommentSubmit}
                    >
                      Comment
                    </Button>
                    <Button
                      h="12"
                      w="16"
                      borderRadius={"0"}
                      border="1px solid #2D394C1A"
                      bg="white"
                      color="#4640DE"
                    >
                      <BiMessageAltDetail />
                    </Button>
                  </Flex>
                </Box>
                <Divider />
              </>
            )}
            <Divider />
          </Box>
          {details.approvals?.map((approval, index) => (
            <Box
              key={index}
              p="5"
              border="1px solid #D6DDEB"
              h="fit-content"
              mt="7"
            >
              <Flex justifyContent={"space-between"}>
                <Text m="0" color="#25324B" className="fw-semibold fs-8">
                  {approval.role}
                </Text>
                <Text m="0" color="#7C8493">
                  {formatDate(approval.date)}
                </Text>
              </Flex>
              <Text color="#7C8493" className="text-muted">
                {approval.comment || "No comment available"}
              </Text>
            </Box>
          ))}
          {comments.length > 0 && (
            <Box p="5" border="1px solid #D6DDEB" h="fit-content" mt="4">
              <Flex justifyContent={"space-between"}>
                <Text m="0" color="#25324B" className="fw-semibold fs-8">
                  {userDetails?.data?.role}
                </Text>
                <Text m="0" color="#7C8493">
                  {formatDate(new Date())}
                </Text>
              </Flex>
              {comments.map((comment, index) => (
                <Text key={index} color="#7C8493" className="text-muted">
                  {comment}
                </Text>
              ))}
            </Box>
          )}
          {shouldDisplayButtons && (
            <Flex pt="10" w="full" mb="10" justifyContent={"space-between"}>
              <Button
                borderRadius={"0"}
                color="#D02F44"
                bg="#F8F8FD"
                onClick={handleDeclinedBtn}
              >
                {isLoadingd ? (
                  <MoonLoader color={"white"} size={20} />
                ) : (
                  <>Decline</>
                )}
              </Button>
              <Button
                borderRadius={"0"}
                color="white"
                bg="#388B41"
                onClick={handleApprovedBtn}
              >
                {isLoading ? (
                  <MoonLoader color={"white"} size={20} />
                ) : (
                  <>Approve</>
                )}
              </Button>
            </Flex>
          )}
        </Box>
        <div className="col-lg-7 border px-0 mb-5">
          <div className="border-bottom d-flex gap-4 px-3">
            <p
              className="fw-semibold pt-2 pb-1"
              onClick={() => setToggle(true)}
              style={{
                borderBottom: `${reuseAbleColor.pupple} 2px ${
                  toggle ? "solid" : ""
                }`,
                width: "150px",
                cursor: "pointer",
              }}
            >
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
            <div className="row">
              <div className="col-lg-6 px-4 pt-4">
                <div>
                  <p className="text-muted fs-6">Full Name</p>
                  <p
                    className="fw-semibold fs-6"
                    style={{ marginTop: "-15px" }}
                  >
                    {details.full_name}
                  </p>
                </div>
                <div>
                  <p className="text-muted fs-6 mt-3">Date of Birth</p>
                  <p
                    className="fw-semibold fs-6"
                    style={{ marginTop: "-15px" }}
                  >
                    {details.date_of_birth}
                  </p>
                </div>
                <div>
                  <p className="text-muted fs-6 mt-3">
                    Faculty/Division/Department/Unit
                  </p>
                  <p
                    className="fw-semibold fs-6"
                    style={{ marginTop: "-15px" }}
                  >
                    {details.department?.name ||
                      details.faculty?.name ||
                      details.unit?.name}
                  </p>
                </div>
                <div>
                  <p className="text-muted fs-6">PF/CM No </p>
                  <p
                    className="fw-semibold fs-6"
                    style={{ marginTop: "-15px" }}
                  >
                    {details.pf_no}
                  </p>
                </div>
                <div>
                  <p className="text-muted fs-6">Appointment Type</p>
                  <p
                    className="fw-semibold fs-6"
                    style={{ marginTop: "-15px" }}
                  >
                    {details.appointment_type === "permanent"
                      ? "Permanent Appointment"
                      : "Temporary Appointment"}
                  </p>
                </div>
                <div>
                  <p className="text-muted fs-6">Date Of Assumption</p>
                  <p
                    className="fw-semibold fs-6"
                    style={{ marginTop: "-15px" }}
                  >
                    {details.date_of_assumption_of_duty}
                  </p>
                </div>
                <div>
                  <p className="text-muted fs-6">
                    Effective Date of exit from college
                  </p>
                  <p
                    className="fw-semibold fs-6"
                    style={{ marginTop: "-15px" }}
                  >
                    {details.effective_date_of_exit_from_the_college}
                  </p>
                </div>
                <div>
                  <p className="text-muted fs-6">
                    Residential address in lasucom
                  </p>
                  <p
                    className="fw-semibold fs-6"
                    style={{ marginTop: "-15px" }}
                  >
                    {details.residential_address_in_lasucom}
                  </p>
                </div>
                <div>
                  <p className="text-muted fs-6">
                    Details on work done since Appointment{" "}
                  </p>
                  <p
                    className="fw-semibold fs-6"
                    style={{ marginTop: "-15px" }}
                  >
                    List of work done below
                  </p>
                </div>
              </div>
              <div className="col-lg-6 px-4 pt-4">
                <div>
                  <p className="text-muted fs-6">Staff Type</p>
                  <p
                    className="fw-semibold fs-6"
                    style={{ marginTop: "-15px" }}
                  >
                    {details.type}
                  </p>
                </div>
                <div>
                  <p className="text-muted fs-6">Pension Fund Administration</p>
                  <p
                    className="fw-semibold fs-6"
                    style={{ marginTop: "-15px" }}
                  >
                    {details.pension_fund_administration}
                  </p>
                </div>
                <div>
                  <p className="text-muted fs-6">
                    Residential Addresst in Lasucom
                  </p>
                  <p
                    className="fw-semibold fs-6"
                    style={{ marginTop: "-15px" }}
                  >
                    23 Allen Avenue{" "}
                  </p>
                </div>
                <div>
                  <p className="text-muted fs-6">Contact Address</p>
                  <p
                    className="fw-semibold fs-6"
                    style={{ marginTop: "-15px" }}
                  >
                    {details.contact_address}
                  </p>
                </div>
                <div>
                  <p className="text-muted fs-6">Next of Kin/Beneficiary</p>
                  <p
                    className="fw-semibold fs-6"
                    style={{ marginTop: "-15px" }}
                  >
                    {details.next_of_kin}
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

export default AppointmentWithrawalDetails;
