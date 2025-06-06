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

export const BereavementDetails = () => {
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
  };

  useEffect(() => {
    setIsLoadinge(true);
    if (id) {
      api
        .getLeavebyID(id)
        .then((response) => {
          const leaveData = response.data;
          setLeaveDetails(leaveData);
          // console.log(response.data);
          setIsLoadinge(false);
        })
        .catch((error) => {
          // console.log(error);
          setIsLoadinge(false);
        });
    }
  }, [id]);

  async function fetchUserDetails() {
    try {
      const userDetails = await getUserDetails();
      setUserDetails(userDetails);
    } catch (error) {
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
        status = "Approve";
      }
    } else if (approvals === 1 && approves === 1) {
      const firstObject = leaveDetails?.approval_bodies[0];
      const user = userDetails?.data?.email;
      const isUserIncludeObject = user?.includes(firstObject);
      if (isUserIncludeObject) {
        status = "Approve";
      }
    }
    return status;
  };
  const displayButton = () => {
    let result = false;

    if(leaveDetails) {

      const approvals = leaveDetails?.approval_bodies?.length;
      const approves = leaveDetails?.approvals?.length;
      if(approvals === approves ){
      return result = false;
      }
     
      //approval index
      const currentApprovalIndex =  leaveDetails?.approval_bodies[approves];
      if ( (currentApprovalIndex.includes(userDetails?.data?.email) ||   currentApprovalIndex === userDetails?.data?.email) && leaveDetails?.status === "pending") {
        result = true;
      }
  
      
    }
    return result
  };

  return (
    <Stack className="px-4" pl="12">
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
        <Flex gap="5" mb="10">
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
                    Leave Applied{" "}
                  </Text>
                  <Text m="0" color="#7C8493">
                    {formatshortDate(
                      leaveDetails.date || "Leave Date not available"
                    )}
                  </Text>
                </Flex>
                <Divider />

                <Text fontWeight="medium" color="#25324B">
                  Bereavement Leave
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
             {displayButton() && (
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
                    <> Declined </>
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
                    toggleApprove()
                  )}
                </Button>
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
                      <Text fontSize={"lg"} color="#7C8493" m="0">
                        Full Name
                      </Text>
                      <Text
                        fontSize={"medium"}
                        color="#25324B"
                        fontWeight={"medium"}
                      >
                        {leaveDetails.full_name}
                      </Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text fontSize={"lg"} color="#7C8493" m="0">
                        Leave Type
                      </Text>
                      <Text
                        fontSize={"medium"}
                        color="#25324B"
                        fontWeight={"medium"}
                      >
                        Bereavement Leave
                      </Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text fontSize={"lg"} color="#7C8493" m="0">
                        Marital Status{" "}
                      </Text>
                      <Text
                        fontSize={"medium"}
                        color="#25324B"
                        fontWeight={"medium"}
                      >
                        {leaveDetails.marital_status}
                      </Text>
                    </GridItem>
                    <GridItem w="100%" h="10" mt="4">
                      <Text fontSize={"lg"} color="#7C8493" m="0">
                        Resumption Date
                      </Text>
                      <Text
                        fontSize={"medium"}
                        color="#25324B"
                        fontWeight={"medium"}
                      >
                        {leaveDetails.resumption_date}
                      </Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text fontSize={"lg"} color="#7C8493" m="0">
                        Division/Department/Unit
                      </Text>
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
                    <GridItem w="100%" h="10">
                      <Text fontSize={"lg"} color="#7C8493" m="0">
                        Name of Deceased
                      </Text>
                      <Text
                        fontSize={"medium"}
                        color="#25324B"
                        fontWeight={"medium"}
                      >
                        {leaveDetails.deceased_name}
                      </Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text fontSize={"lg"} color="#7C8493" m="0">
                        Leave Duration
                      </Text>
                      <Text
                        fontSize={"medium"}
                        color="#25324B"
                        fontWeight={"medium"}
                      >
                        {leaveDetails.deceased_relationship} Days
                      </Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text fontSize={"lg"} color="#7C8493" m="0">
                        Start Date
                      </Text>
                      <Text
                        fontSize={"medium"}
                        color="#25324B"
                        fontWeight={"medium"}
                      >
                        {leaveDetails.start_date}
                      </Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text fontSize={"lg"} color="#7C8493" m="0">
                        ⁠Deceased Relationship to applicant{" "}
                      </Text>
                      <Text
                        fontSize={"medium"}
                        color="#25324B"
                        fontWeight={"medium"}
                      >
                        {leaveDetails.deceased_relationship}
                      </Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text fontSize={"lg"} color="#7C8493" m="0">
                        End Date
                      </Text>
                      <Text
                        fontSize={"medium"}
                        color="#25324B"
                        fontWeight={"medium"}
                      >
                        {leaveDetails.end_date}
                      </Text>
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
