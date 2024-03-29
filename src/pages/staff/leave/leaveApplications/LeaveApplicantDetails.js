import { reuseAbleColor } from "../../../../components/Color";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import {
  Box,
  Flex,
  Text,
} from "@chakra-ui/layout";
import api from "../../../../api";
import { useSnackbar } from "notistack";
import { MoonLoader } from "react-spinners";


const LeaveApplicantDetails = () => {
  const [toggle, setToggle] = useState(true); 
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [leaveDetails, setLeaveDetails] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      api.getLeavebyID(id)
      .then(response => {
        const leaveData = response.data;
        setLeaveDetails(leaveData)
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

  return (
    <div>
      {isLoading ? (
        <Box
        w={"80vw"}
        display='flex'
        flexDirection='column'
        h={"80vh"}
        alignItems='center'
        justifyContent='center'>
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70" style={{ zIndex: 9999 }}>
        <div className="inline-block">
            <MoonLoader color={"#984779"} size={80} />
          </div>
        </div>
      </Box>
      ) : (
      <div className='container px-5' id='res-padding'>
        <div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
            className='d-flex align-items-center gap-2'>
            <BsArrowLeftShort size={"40"} />
            <p className=' fs-5 mt-3 '>Applicant Details</p>
          </div>
        </div>
        <div className='row mt-3 gap-5'>
          <div className='col-lg-4 border px-3' >
            <div className='d-flex gap-3 mt-3'>
              <div>
                <img
                  src={leaveDetails.user_image}
                  width={"65px"}
                  style={{ borderRadius: "50%",
                  width: "50px",
                  height: "50px",borderWidth:5, borderColor:'#ccc' }}
                  alt='/'
                />
              </div>
              <div className='mt-2'>
                <p className='fs-6 fw-semibold'>{leaveDetails.full_name}</p>
                <p className='text-muted' style={{ marginTop: "-15px" }}>
                {leaveDetails.staffID}
                </p>
              </div>
            </div>
            <div className='px-3 mt-3' style={{ backgroundColor: "#F8F8FD" }}>
              <div className='d-flex justify-content-between pt-2 border-bottom'>
                <p>Date Applied</p>
                <p>{formatshortDate(leaveDetails.date || "Leave Date not available")}</p>
              </div>
              <div className='d-flex justify-content-between pt-2 border-bottom'>
                <p>Leave Status</p>
                <p>{leaveDetails.status}</p>
              </div>
            </div>
            {leaveDetails.approvals?.map((approval, index) => (
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
            <div className='border-bottom my-3'></div>
          </div>
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
              <Box my='5' mx='5' bg='#F8F8FD' h={400} w={200} borderWidth={2}>
                <Box h='100%' display={'flex'} justifyContent='center' alignItems='center' flexDirection='column'>
                  <object data={leaveDetails.upload_documents} type="application/pdf" width="100%" height="100%">
                  </object>
                  <p className='text-muted fs-8 mt-20'>Click here<a href={leaveDetails.upload_documents}> to view Document!</a></p>
                </Box>
              </Box>
            )}
            {toggle && (
              <div className='row'>
                <div className='col-lg-6 px-4 pt-4'>
                  <div>
                    <p className='text-muted fs-6'>Full Name</p>
                    <p
                      className='fw-semibold fs-6'
                      style={{ marginTop: "-15px" }}>
                      {leaveDetails.full_name}
                    </p>
                  </div>
                  <div>
                    <p className='text-muted fs-6 mt-3'>Marital Status</p>
                    <p
                      className='fw-semibold fs-6'
                      style={{ marginTop: "-15px" }}>
                      {leaveDetails.marital_status}
                    </p>
                  </div>
                  <div>
                    <p className='text-muted fs-6 mt-3'>
                      Division/Department/Unit
                    </p>
                    <p
                      className='fw-semibold fs-7'
                      style={{ marginTop: "-15px" }}>
                      {leaveDetails.department?.name || leaveDetails.faculty?.name || leaveDetails.unit?.name}
                    </p>
                  </div>
                  <div>
                    <p className='text-muted fs-6'>Leave Duration </p>
                    <p
                      className='fw-semibold fs-6'
                      style={{ marginTop: "-15px" }}>
                    {leaveDetails.leave_duration} Days
                    </p>
                  </div>
                  <div>
                    <p className='text-muted fs-6'>Start Date</p>
                    <p
                      className='fw-semibold fs-6'
                      style={{ marginTop: "-15px" }}>
                        {formatDate(leaveDetails.start_date)}
                    </p>
                  </div>
                  <div>
                    <p className='text-muted fs-6'>End Date</p>
                    <p
                      className='fw-semibold fs-6'
                      style={{ marginTop: "-15px" }}>
                        {formatDate(leaveDetails.end_date)}
                    </p>
                  </div>
                </div>
                <div className='col-lg-6 px-4 pt-4'>
                  <div>
                    <p className='text-muted fs-6'>Leave Type </p>
                    <p
                      className='fw-semibold fs-6'
                      style={{ marginTop: "-15px" }}>
                      {leaveDetails.leave_type}
                    </p>
                  </div>
                  {leaveDetails.leave_type === 'maternity-leave' || leaveDetails.leave_type === 'paternity-leave' ? (
                    <div>
                      <div>
                        <p className='text-muted fs-6'>Number of Births</p>
                        <p className='fw-semibold fs-6' style={{ marginTop: "-15px" }}>
                          {leaveDetails.number_of_births}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
       )}
    </div>
  );
};

export default LeaveApplicantDetails;
