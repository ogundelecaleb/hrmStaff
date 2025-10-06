import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import {
  TabIndicator,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/tabs";
import { Avatar, Spinner } from "@chakra-ui/react";
import { Box, Divider, Flex, Grid, GridItem, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { BiMessageAltDetail } from "react-icons/bi";
import { MoonLoader } from "react-spinners";
import { RxAvatar } from "react-icons/rx";
import { getUserDetails } from "../../../../utils/utils";
import api from "../../../../api";
import { enqueueSnackbar } from "notistack";

const ResumptionDetails = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const details = location?.state?.details;

  //   const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingd, setIsLoadingd] = useState(false);
  const [leaveDetails, setLeaveDetails] = useState("");
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
    if (details) {
      api
        .getResumption(details?.id)
        .then((response) => {
          const leaveData = response.data;
          setLeaveDetails(leaveData);
          setIsLoadinge(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoadinge(false);
        });
    }
  }, [details]);

  async function fetchUserDetails() {
    try {
      const userDetails = await getUserDetails();
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

  const toggleApprove = () => {
    const approvals = leaveDetails?.approval_bodies?.length;
    const approves = leaveDetails?.approvals?.length;

    let status = "Recommend";

    if (approves < 1 && approvals > 1) {
      const firstObject = leaveDetails?.approval_bodies[0];
      const user = userDetails?.data?.email;
      const isUserIncludeObject = user?.includes(firstObject);
      if (isUserIncludeObject) {
        status = "Recommend";
      }
    } else if (approves > 0 && approvals > 1) {
      const bodies = leaveDetails?.approval_bodies;
      const lastObject = bodies[bodies.length - 1];
      const userRole = userDetails?.data?.email;

      const isUserMatchRole = userRole === lastObject;
      if (isUserMatchRole) {
        status = "Confirm";
      }
    } else if (approvals === 1 && approves === 1) {
      const firstObject = leaveDetails?.approval_bodies[0];
      const user = userDetails?.data?.email;
      const isUserIncludeObject = user?.includes(firstObject);
      if (isUserIncludeObject) {
        status = "Confirm";
      }
    }
    return status;
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
      const response = await api.approveResume({
        id: details?.id,
        status: "approved",
        comment: commentText,
      });
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
      const response = await api.approveResume({
        id: details?.id,
        status: "declined",
        comment: commentText,
      });
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

  const displayButton = () => {
    let result = false;

    if (leaveDetails) {
      const approvals = leaveDetails?.approval_bodies?.length;
      const approves = leaveDetails?.approvals?.length;
      if (approvals === approves) {
        return (result = false);
      }

      //approval index
      const currentApprovalIndex = leaveDetails?.approval_bodies[approves];
      if (
        (currentApprovalIndex.includes(userDetails?.data?.email) ||
          currentApprovalIndex === userDetails?.data?.email) &&
        leaveDetails?.approval_status === "pending"
      ) {
        result = true;
      }
    }
    return result;
  };
  return (
    <div>
   
      <div className="px-4" pl="16" pb="10">
        <div className="d-flex flex-wrap mt-3 align-items-center justify-content-between">
          <Link
            style={{ cursor: "pointer", marginLeft: "-12px" }}
            onClick={() => navigate(-1)}
            className="d-flex align-items-center gap-2"
          >
            <BsArrowLeftShort size={"40"} />
            <p className=" fs-5 mt-3 ">Applicant Details</p>
          </Link>
        </div>
        {isLoadinge && !leaveDetails ? (
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
          <div className="flex gap-4 mb-10">
            <div>
              <div className="p-4 border ">
                <div className="flex gap-3 my-4">
                  <div>
                    {leaveDetails?.leave?.user_image ? (
                      <Avatar
                        h={"80.17px"}
                        w={"80.17px"}
                        src={leaveDetails?.leave?.user_image}
                      />
                    ) : (
                      <RxAvatar size={80} color={"#25324B"} />
                    )}
                  </div>
                  <div>
                    <Text color="#25324B" className="fw-semibold fs-6">
                      {leaveDetails?.leave?.full_name}
                    </Text>
                    <Text
                      color="#7C8493"
                      className="text-muted"
                      style={{ marginTop: "-17px" }}
                    >
                      {leaveDetails?.leave?.staff_number}
                    </Text>
                  </div>
                </div>
                <div className="py-2 px-3 bg-[#F8F8FD]">
                  <div className="flex justify-between">
                    <Text m="0" color="#25324B">
                      Date Applied
                    </Text>
                    <Text m="0" color="#7C8493">
                      {formatshortDate(
                        leaveDetails?.leave?.date || "Leave Date not available"
                      )}
                    </Text>
                  </div>
                  <Divider />

                  <Text fontWeight="medium" color="#25324B">
                   {leaveDetails?.leave?.leave_type}
                  </Text>
                </div>

                {!isCommentDisplayed && (
                  <>
                    <Box pt="10">
                      <input
                        type="text"
                        className="border rounded-md  py-2 px-2"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <Flex pt="5" gap="4">
                        <button
                        className="py-2 px-3 justify-center w-full flex items-center gap-1 rounded-md bg-purple-800 text-white text-sm "
                         
                          onClick={handleCommentSubmit}
                        >
                         Add Comment  <BiMessageAltDetail />
                        </button>
                      
                      </Flex>
                    </Box>
                    <Divider />
                  </>
                )}
              </div>
              {leaveDetails?.approvals?.map((approval, index) => (
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
                      {formatDate(approval?.date)}
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
              {/* {shouldDisplayButtons && !isApproved && ( */}
              {displayButton() && (
                <Flex pt="10" w="full" mb="10" justifyContent={"space-between"}>
                  <Button
                    borderRadius={"6"}
                    color="#D02F44"
                    bg="#F8F8FD"
                    onClick={handleDeclinedBtn}
                  >
                    {isLoadingd ? (
                      <MoonLoader color={"white"} size={20} />
                    ) : (
                      <> Not Confirmed </>
                    )}
                  </Button>
                  <Button
                    borderRadius={"6"}
                    color="white"
                    bg="#388B41"
                    onClick={handleApprovedBtn}
                  >
                    {isLoading ? (
                      <MoonLoader color={"white"} size={20} />
                    ) : (
                      toggleApprove()
                    )}
                  </Button>
                </Flex>
              )}
            </div>
            <Box
              h={"fit-content"}
              pb="20"
              px="5"
              className=" border  tb-res-parent"
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
                          {leaveDetails?.leave?.full_name}
                        </h3>
                      </GridItem>
                      <GridItem w="100%" h="10">
                        <h2 className="text-base font-medium text-[#7C8493]">
                          Leave Type
                        </h2>
                        <h3 className="text-sm font-medium text-[#000]">
                                                  {leaveDetails?.leave?.leave_type}

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
                          {leaveDetails?.leave?.department?.name ||
                            leaveDetails?.leave?.faculty?.name ||
                            leaveDetails?.leave?.unit?.name}
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
                     

                      <GridItem w="100%" h="10">
                        <h2 className="text-base font-medium text-[#7C8493]">
                         Date Leave Commenced
                        </h2>
                        <h3 className="text-sm font-medium text-[#000]">
                          {formatDate(leaveDetails?.leave?.start_date)}
                        </h3>
                      </GridItem>
                      <GridItem w="100%" h="10">
                        <h2 className="text-base font-medium text-[#7C8493]">
                          Address when on Leave{" "}
                        </h2>
                        <h3 className="text-sm font-medium text-[#000]">
                          {leaveDetails?.leave?.leave_address}
                        </h3>
                      </GridItem>
                      <GridItem w="100%" h="10">
                        <h2 className="text-base font-medium text-[#7C8493]">
                          End Date
                        </h2>
                        <h3 className="text-sm font-medium text-[#000]">
                          {formatDate(leaveDetails?.leave?.end_date)}
                        </h3>
                      </GridItem>
                      <GridItem w="100%" h="10">
                        <h2 className="text-base font-medium text-[#7C8493]">
                         Date of Resumption
                        </h2>
                        <h3 className="text-sm font-medium text-[#000]">
                          {formatDate(leaveDetails?.leave?.resumption_date)}
                        </h3>
                      </GridItem>
                    </Grid>
                  </TabPanel>
                  <TabPanel>Document</TabPanel>
                </TabPanels>
              </Tabs>
              {/* </div> */}
            </Box>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumptionDetails;
