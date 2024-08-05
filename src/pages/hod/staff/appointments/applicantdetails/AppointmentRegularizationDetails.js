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
import { Avatar } from "@chakra-ui/react";
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

const AppointmentRegularizationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
      api
        .getRegularizationbyID(id)
        .then((response) => {
          const leaveData = response.data;
          setDetails(leaveData);
          console.log(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar(error.message, { variant: "error" });
          setIsLoading(false);
        });
    }
  }, [id]);

  async function fetchUserDetails() {
    try {
      const userDetails = await getUserDetails();
      console.log("User Details:", userDetails);
      setUserDetails(userDetails);
    } catch (error) {
      console.error("Error fetching your basic details", error);
      enqueueSnackbar(error.message, { variant: "error" });
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

  const shouldDisplayButtons =
    !details.approvals ||
    !details.approvals.some(
      (approval) =>
        approval.role === userDetails?.data?.role &&
        (approval.status === "approved" || approval.status === "declined")
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
  }

  async function handleApprovedBtn(e) {
    e.preventDefault();
    if (!isCommentDisplayed) {
      enqueueSnackbar("Please add a comment before before Accepting.", {
        variant: "warning",
      });
      return;
    }
    setIsLoadinge(true);
    try {
      const response = await api.handleRegularizedApprove({
        id,
        status: "approved",
        comment: commentText,
      });
      console.log("responce==>>>>>", response);
      enqueueSnackbar("Application approved successfully", {
        variant: "success",
      });
      setIsLoadinge(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoadinge(false);
    }
  }

  async function handleDeclinedBtn(e) {
    e.preventDefault();
    if (!isCommentDisplayed) {
      enqueueSnackbar("Please add a comment before before declining.", {
        variant: "warning",
      });
      return;
    }
    setIsLoadingd(true);
    try {
      const response = await api.handleRegularizedDecline({
        id,
        status: "declined",
        comment: commentText,
      });
      console.log("responce==>>>>>", response);
      enqueueSnackbar("Application declined successfully", {
        variant: "success",
      });
      setIsLoadingd(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoadingd(false);
    }
  }

  return (
    <Stack className="" px="12">
      <div
        id="no-padding-res"
        className="d-flex flex-wrap mt-3 align-items-center justify-content-between"
      >
        <Link
          style={{ cursor: "pointer", marginLeft: "-12px" }}
          onClick={() => navigate(-1)}
          className="d-flex align-items-center gap-2"
        >
          <BsArrowLeftShort size={"40"} />
          <p className=" fs-5 mt-3 ">Applicant Details</p>
        </Link>
      </div>
      <Flex gap="5">
        <Box className="col-lg-4">
          <Box p="5" border="1px solid #D6DDEB  " h="fit-content">
            <Box className="d-flex gap-2 my-4">
              <Flex>
                <Avatar src={details.user_image} size="xl" />
                <Box ml="3">
                  <Text fontWeight="bold">{details.full_name}</Text>
                  <Text fontSize="sm">{details.staffID}</Text>
                  <Text fontSize="sm">{details.role}</Text>
                  <div className="mt-2">
                {" "}
                <Text fontSize={"md"} color="#7C8493" m="0">
                 Approval status:
                </Text>
                <Text fontSize={"md"} color="#25324B" fontWeight={""}>
                  {details?.approval_status}
                </Text>
              </div>
                </Box>
              </Flex>
            </Box>
            <Box className="py-2 px-3 " style={{ backgroundColor: "#F8F8FD" }}>
              <Flex justifyContent={"space-between"}>
                <Text m="0" color="#25324B">
                  Date Applied:
                </Text>
                <Text m="0" ml="1" color="#7C8493">
                  {formatshortDate(
                    details.date || "Application Date not available"
                  )}
                </Text>
              </Flex>
              <Divider />

              <Text fontWeight="medium" color="#25324B">
                Regularization of Appointment
              </Text>
            </Box>
            {details?.applicant_approval_status_to_hod && (
              <div className="mt-2">
                <Text fontSize={"md"} color="#7C8493" m="0">
                  Staff Comment HOD/HOU Comment:
                </Text>
                <Text fontSize={"md"} color="#25324B" fontWeight={""}>
                  {details?.applicant_comment_to_hod}
                </Text>{" "}
                <Text fontSize={"md"} color="#7C8493" m="0">
                  Staff Response HOD/HOU Comment:
                </Text>
                <Text fontSize={"md"} color="#25324B" fontWeight={""}>
                  {details?.applicant_approval_status_to_hod}
                </Text>
              </div>
            )}

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
        <Box
          h={"fit-content"}
          pb="20"
          px="5"
          className="col-lg-8 border  tb-res-parent"
        >
          {/* <div className='tb-res'> */}
          <Tabs position="relative" variant={"line"} pt={"2"}>
            <Box className="tab-scroll" overflowX={"auto"}>
              <Box className="tb-res-2" position={"relative"}>
                <TabList className="border-bottom">
                  <Tab
                    _focus={{ color: "black" }}
                    fontWeight={"semibold"}
                    color={"gray"}
                  >
                    Applicant Information
                  </Tab>
                  {/* <Tab
                    _focus={{ color: "black" }}
                    fontWeight={"semibold"}
                    color={"gray"}>
                    Document
                  </Tab> */}
                </TabList>
                <TabIndicator
                  mt="-1.5px"
                  height="3px"
                  borderRadius="9px 9px 0 0"
                />
              </Box>
            </Box>
            <TabPanels>
              <TabPanel>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"lg"} color="#7C8493" m="0">
                      Full Name
                    </Text>
                    <Text fontSize={"lg"} color="#25324B" fontWeight={"medium"}>
                      {details.full_name}
                    </Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"lg"} color="#7C8493" m="0">
                      Staff Type
                    </Text>
                    <Text fontSize={"lg"} color="#25324B" fontWeight={"medium"}>
                      {details.staff_type}
                    </Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"lg"} color="#7C8493" m="0">
                      PF/CM No{" "}
                    </Text>
                    <Text fontSize={"lg"} color="#25324B" fontWeight={"medium"}>
                      {details.pf_no}
                    </Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"lg"} color="#7C8493" m="0">
                      Current Level{" "}
                    </Text>
                    <Text fontSize={"lg"} color="#25324B" fontWeight={"medium"}>
                      {details.level}
                    </Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"lg"} color="#7C8493" m="0">
                      Date of First Appointment{" "}
                    </Text>
                    <Text fontSize={"lg"} color="#25324B" fontWeight={"medium"}>
                      {formatDate(details.date_of_first_appointment)}
                    </Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"lg"} color="#7C8493" m="0">
                      Division/Department/Unit
                    </Text>
                    <Text fontSize={"md"} color="#25324B" fontWeight={"medium"}>
                      {details.department?.name ||
                        details.faculty?.name ||
                        details.unit?.name}
                    </Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"lg"} color="#7C8493" m="0">
                      Grade on Temporary Appointment
                    </Text>
                    <Text fontSize={"lg"} color="#25324B" fontWeight={"medium"}>
                      {details.grade_on_temporary_appointment}
                    </Text>
                  </GridItem>
                  <GridItem w="100%" h="12">
                    <Text fontSize={"lg"} color="#7C8493" m="0" mt="5">
                      Regularization of appointment form
                    </Text>
                    <Text fontSize={"md"} color="#25324B" fontWeight={"medium"}>
                      {details.regularization_of_appointment_form}
                    </Text>
                  </GridItem>
                  <GridItem w="100%" h="12">
                    <Text fontSize={"md"} color="#7C8493" m="0">
                      Details of work done since Appointment
                    </Text>
                    <Text fontSize={"sm"} color="#25324B" fontWeight={"medium"}>
                      {details.details_of_work_done_since_appointment}
                    </Text>
                  </GridItem>
                </Grid>
              </TabPanel>
              {/* <TabPanel>Document</TabPanel> */}
            </TabPanels>
          </Tabs>
          {/* </div> */}
        </Box>
      </Flex>
    </Stack>
  );
};

export default AppointmentRegularizationDetails;
