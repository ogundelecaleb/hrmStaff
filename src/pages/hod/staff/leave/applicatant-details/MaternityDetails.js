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
import { BiMessageAltDetail } from "react-icons/bi";
import api from "../../../../../api";
import { useSnackbar } from "notistack";
import { getUserDetails } from "../../../../../utils/utils";
import { MoonLoader } from "react-spinners";
import { RxAvatar } from "react-icons/rx";

export const MaternityDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingd, setIsLoadingd] = useState(false);
  const [leaveDetails, setLeaveDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isCommentDisplayed, setIsCommentDisplayed] = useState(false);
  const [isLoadinge, setIsLoadinge] = useState(false);

  const handleCommentSubmit = () => {
    if (commentText.trim() !== "") {
      setComments([...comments, commentText]);
      setIsCommentDisplayed(true);
    }
    console.log("commets", commentText);
  };

  useEffect(() => {
    setIsLoadinge(true);
    if (id) {
      api
        .getLeavebyID(id)
        .then((response) => {
          const leaveData = response.data;
          setLeaveDetails(leaveData);
          console.log(response.data);
          setIsLoadinge(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoadinge(false);
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
    !leaveDetails.approvals ||
    !leaveDetails.approvals.some(
      (approval) =>
        approval.role === userDetails?.data?.role &&
        (approval.status === "approved" || approval.status === "declined")
    );

  async function handleApprovedBtn(e) {
    e.preventDefault();
    if (!isCommentDisplayed) {
      enqueueSnackbar("Please add a comment before before Accepting.", {
        variant: "warning",
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.handleApprove({
        id,
        status: "approved",
        comment: commentText,
      });
      console.log("responce==>>>>>", response);
      enqueueSnackbar("Application approved successfully", {
        variant: "success",
      });
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
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
      const response = await api.handleDecline({
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

  function getLastItem(array) {
    console.log("appprovalls===>>>", leaveDetails?.approval_bodies);
    // Check if the array is not empty
    if (array.length === 0) {
      return undefined; // Return undefined if the array is empty
    }

    // Return the last item in the array
    return array[array.length - 1];
  }
  const isApproved = leaveDetails?.status !== "approved";
  const toggleApprove = () => {
    const approvals = leaveDetails?.approval_bodies?.length;
    const approves = leaveDetails?.approvals?.length;

    let status = "Recommend";

    if (approves < 1 && approvals > 1) {
      const firstObject = leaveDetails?.approval_bodies[0];
      const user = userDetails?.data?.email;
      console.log("user-->>", user);
      const isUserIncludeObject = user?.includes(firstObject);
      if (isUserIncludeObject) {
        status = "Recommend";
      }
    } else if (approves > 0 && approvals > 1) {
      const bodies = leaveDetails?.approval_bodies;
      const lastObject = bodies[bodies.length - 1];
      const userRole = userDetails?.data?.role;
      const isUserMatchRole = userRole === lastObject;
      if (isUserMatchRole) {
        status = "Approve";
      }
    } else if (approvals === 1) {
      const firstObject = leaveDetails?.approval_bodies[0];
      const user = userDetails?.data?.email;
      const isUserIncludeObject = user?.includes(firstObject);
      if (isUserIncludeObject) {
        status = "Approve";
      }
    }
    return status;
  };

  return (
    <Stack className="container" pl="16" pb="10">
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
      {isLoadinge ? (
        <Box
          w={"70vw"}
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
      ) : (
        <Flex gap="5" mt="10">
          <Box>
            <Box p="5" border="1px solid #D6DDEB  " h="fit-content">
              <Box className="d-flex gap-3 my-4">
                <div>
                  {leaveDetails.user_image ? (
                    <Avatar
                      h={"90.17px"}
                      w={"90.17px"}
                      src={leaveDetails.user_image}
                    />
                  ) : (
                    <RxAvatar size={80} color={"#25324B"} />
                  )}
                </div>
                <div>
                  <Text color="#25324B" className="fw-semibold fs-5">
                    {leaveDetails.full_name}
                  </Text>
                  <Text
                    color="#7C8493"
                    className="text-muted"
                    style={{ marginTop: "-17px" }}
                  >
                    {leaveDetails.staffID}
                  </Text>
                </div>
              </Box>
              <Box
                className="py-2 px-3 "
                style={{ backgroundColor: "#F8F8FD" }}
              >
                <Flex justifyContent={"space-between"}>
                  <Text m="0" color="#25324B">
                    Date Applied{" "}
                  </Text>
                  <Text m="0" color="#7C8493">
                    {formatshortDate(
                      leaveDetails.date || "Leave Date not available"
                    )}
                  </Text>
                </Flex>
                <Divider />

                <Text fontWeight="medium" color="#25324B">
                  Maternity Leave
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
            </Box>
            {leaveDetails.approvals?.map((approval, index) => (
              <Box
                key={index}
                p="5"
                border="1px solid #D6DDEB"
                h="fit-content"
                mt="4"
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
            {shouldDisplayButtons && isApproved && (
              <Flex pt="10" w="full" mt="10" justifyContent={"space-between"}>
                {!leaveDetails?.approvals?.some(
                  (approval) => approval?.role === userDetails?.data?.role
                ) && (
                  <>
                    <Button
                      borderRadius={"0"}
                      color="#D02F44"
                      bg="#F8F8FD"
                      onClick={handleDeclinedBtn}
                    >
                      {isLoadingd ? (
                        <MoonLoader color={"white"} size={20} />
                      ) : (
                        <> Decline </>
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
                      ) : (toggleApprove()
                        // <>
                        //   {" "}
                        //   {(leaveDetails?.approval_bodies &&
                        //     getLastItem(leaveDetails?.approval_bodies)) ===
                        //   userDetails?.data?.role
                        //     ? "Approve"
                        //     : "Recomemnd"}{" "}
                        // </>
                      )}
                    </Button>
                  </>
                )}
              </Flex>
            )}
          </Box>
          <Box
            h={"fit-content"}
            pb="20"
            px="5"
            className="col-lg-7 border  tb-res-parent"
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
                    <Tab
                      _focus={{ color: "black" }}
                      fontWeight={"semibold"}
                      color={"gray"}
                    >
                      Document
                    </Tab>
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
                      <h2 className="text-base font-medium text-[#7C8493]">
                        Full Name
                      </h2>
                      <h3 className="text-sm font-medium text-[#000]">
                        {leaveDetails.full_name}
                      </h3>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <h2 className="text-base font-medium text-[#7C8493]">
                        Leave Type
                      </h2>
                      <h3 className="text-sm font-medium text-[#000]">
                        Annual Leave
                      </h3>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <h2 className="text-base font-medium text-[#7C8493]">
                        Marital Status{" "}
                      </h2>
                      <h3 className="text-sm font-medium text-[#000]">
                        {leaveDetails.marital_status}
                      </h3>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <h2 className="text-base font-medium text-[#7C8493]">
                        Number Of Birth
                      </h2>
                      <h3 className="text-sm font-medium text-[#000]">
                        {leaveDetails.number_of_births}
                      </h3>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <h2 className="text-base font-medium text-[#7C8493]">
                        Date of First Appointment{" "}
                      </h2>
                      <h3 className="text-sm font-medium text-[#000]">
                        {formatDate(leaveDetails.date_of_first_appointment)}
                      </h3>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <h2 className="text-base font-medium text-[#7C8493]">
                        Division/Department/Unit
                      </h2>
                      <Text
                        fontSize={"sm"}
                        color="#25324B"
                        fontWeight={"medium"}
                      >
                        {leaveDetails.department?.name ||
                          leaveDetails.faculty?.name ||
                          leaveDetails.unit?.name}
                      </Text>
                    </GridItem>

                    {/* <GridItem w='100%' h='10'>
                    <Text fontSize={"lg"} color='#7C8493' m='0'>
                      Leave due for Current year
                    </Text>
                                        <h3 className="text-sm font-medium text-[#000]">

                      {leaveDetails.total_leave_due}
                    </Text>
                  </GridItem> */}
                    <GridItem w="100%" h="10" mt="4">
                      <h2 className="text-base font-medium text-[#7C8493]">
                        To be relived by (Name of Staff)
                      </h2>
                      <h3 className="text-sm font-medium text-[#000]">
                        {leaveDetails.replacement_on_duty}
                      </h3>
                    </GridItem>

                    <GridItem w="100%" h="10">
                      <h2 className="text-base font-medium text-[#7C8493]">
                        Start Date
                      </h2>
                      <h3 className="text-sm font-medium text-[#000]">
                        {formatDate(leaveDetails.start_date)}
                      </h3>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <h2 className="text-base font-medium text-[#7C8493]">
                        Address when on Leave{" "}
                      </h2>
                      <h3 className="text-sm font-medium text-[#000]">
                        {leaveDetails.leave_address}
                      </h3>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <h2 className="text-base font-medium text-[#7C8493]">
                        End Date
                      </h2>
                      <h3 className="text-sm font-medium text-[#000]">
                        {formatDate(leaveDetails.end_date)}
                      </h3>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <h2 className="text-base font-medium text-[#7C8493]">
                        Resumption Date
                      </h2>
                      <h3 className="text-sm font-medium text-[#000]">
                        {formatDate(leaveDetails.resumption_date)}
                      </h3>
                    </GridItem>
                  </Grid>
                </TabPanel>
                <TabPanel>
                  <Box
                    my="5"
                    mx="5"
                    bg="#F8F8FD"
                    h={400}
                    w={500}
                    borderWidth={2}
                  >
                    <Box
                      h="100%"
                      display={"flex"}
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                    >
                      <object
                        data={leaveDetails.upload_documents}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                      ></object>
                      <p className="text-muted fs-8 mt-20">
                        Click here
                        <a href={leaveDetails.upload_documents}>
                          {" "}
                          to view Document!
                        </a>
                      </p>
                    </Box>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
            {/* </div> */}
          </Box>
        </Flex>
      )}
    </Stack>
  );
};
