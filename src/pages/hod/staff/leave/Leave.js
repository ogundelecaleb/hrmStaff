import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Skeleton
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import CommonButton from "../../../../components/commonbutton/Button";
import { CiSearch } from "react-icons/ci";
// import { useSnackbar } from "notistack";
import api from "../../../../api";
import { useNavigate, Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { getUserDetails } from "../../../../utils/utils";
import NoData from "../../../../components/NoData"

const CustomSkeletonLoader = ({ count }) => {
  const skeletonRows = Array.from({ length: count }, (_, index) => (
    <tr key={index}>
      <td className='text-center' style={{ height: "65px" }}>
        <Skeleton width="100%" height="50px" />
      </td>
      <td className='fs-6 text-center '>
        <Skeleton width="100%" height="50px" />
      </td>
      <td className='fs-6 text-center '>
        <Skeleton width="100%" height="50px" />
      </td>
      <td className='text-center' style={{ cursor: "pointer", width:'40px' }}>
        <Skeleton width="60%" height="25px"  />
        <Skeleton width="60%" height="25px" marginTop="10px" />
      </td>
    </tr>
  ));

  return skeletonRows;
};
const Leave = ({ id }) => {
  
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [userDetails, setUserDetails] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

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

  async function getdLeaves(page) {
    try {
      const userDetails = await getUserDetails();
      const role = userDetails.data.role;
  
      if (['CS'].includes(role)) {
        // Fetch data for 'DEAN', 'CS', role
        const response = await api.fetchCsLeaves({ params: { page } });
        return response;
        
      } else  if (['PT'].includes(role)) {
        // Fetch data for 'PT' role
        const response = await api.fetchPtLeaves({ params: { page } });
        return response;
      }else  if (['DEAN'].includes(role)) {
        // Fetch data for 'PT' role
        const response = await api.fetchDnLeaves({ params: { page } });
        return response;
      } else if (['HOD'].includes(role)) {
        // Fetch data for 'HOD' or 'HOU' role
        const response = await api.fethDepartmentLeave({ params: { page } });
        return response;
      } else if (['DPT'].includes(role)) {
        // Fetch data for 'HOD' or 'DPT' role
        const response = await api.fetchDptLeaves({ params: { page } });
        return response;
      } else if (['HNASEJ'].includes(role)) {
        // Fetch data for 'HOD' or 'HNASEJ' role
        const response = await api.fetchHnasejLeaves({ params: { page } });
        return response;
      } else if (['HNASES'].includes(role)) {
        // Fetch data for 'HOD' or 'HNASES' role
        const response = await api.fetchHnasesLeaves({ params: { page } });
        return response;
      } else if (['HOU'].includes(role)) {
        // Fetch data for 'HOD' or 'HOU' role
        const response = await api.fethUnitLeave({ params: { page } });
        return response;
      } else {
        // Handle other roles or scenarios
        return { data: [] }; // Return empty data or handle differently
      }
    } catch (error) {
      console.error("Error fetching leave data", error);
      enqueueSnackbar(error.message, { variant: 'error' });
      throw error; // Rethrow the error to be caught by react-query
    }
  }  

  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(['leaveRequest', page], () =>
    getdLeaves(page),
    {
      keepPreviousData: true, refetchOnWindowFocus: "always",
    }
  );
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const filteredData = data?.data.filter((item) => {
    if (selectedStatus === "All") {
      return true; // Show all applications
    } else if (selectedStatus === "Pending") {
      return item.hod_approval.includes("pending");
    } else if (selectedStatus === "Approved") {
      return item.hod_approval.includes("approved");
    } else if (selectedStatus === "Declined") {
      return item.hod_approval.includes("declined");
    }
    return false;
  });

  return (

    <div>
    {isLoading ? (
      <div className=' shadow mx-3 pb-5 mb-5 mt-5'>
        <p className='fw-semibold ps-4 fs-4 py-4 border-bottom'>Leave Applications</p>

        <div className='tb-res-parent mt-4'>
          <div className='tb-res'>
            <table className='table table-hover table-bordered'>
              <thead>
              </thead>
              <tbody>
                <CustomSkeletonLoader count={6} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ) : (
    <Box>
     
      <Box>
        <Tabs>
          <TabList gap={"30"} px="20">
            <Tab fontSize={"lg"} className="flex items-center gap-1" onClick={() => setSelectedStatus("All")} >
              All ({data?.meta?.total})
            </Tab>
            <Tab fontSize={"lg"} onClick={() => setSelectedStatus("Pending")}>
              Pending
            </Tab>
            <Tab fontSize={"lg"} onClick={() => setSelectedStatus("Approved")}>
              Approved
            </Tab>
            <Tab fontSize={"lg"} onClick={() => setSelectedStatus("Declined")}>
              Declined
            </Tab>
          </TabList>

          <TabPanels>

          {data && data.data && data?.data?.length === 0 && ( 
            <Box
              w={"80vw"}
              display="flex"
              flexDirection="column"
              h={"20vh"}
              alignItems="center"
              justifyContent="center"
            >
              <div className='row mt-5 ' style={{ height: "10px", width:"80%"}}>
                <NoData/>
              </div>
      
            </Box>
          )}

            <TabPanel>
              <TableContainer>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>
                      <Text>Staff Name</Text>

                      </Th>
                      <Th>
                        <Text>Leave type</Text>
                      </Th>
                      <Th>
                        <Text>Stage</Text>
                      </Th>
                      <Th>
                        <Text>Date Applied</Text>
                      </Th>
                      <Th>
                        <Text>No. of Days</Text>
                      </Th>
                      <Th>
                        <Text>Action</Text>
                      </Th>
                    </Tr>
                  </Thead>

                 {/* Table for all the leaves applied */}
                  <Tbody>
                  {filteredData?.map((item) => (
                      <Tr key={item.id}>
                        <Td>
                          <Flex gap='3' alignItems={"center"}>
                            {item.user_image ? (
                              <Avatar
                                size='sm'
                                src={item.user_image}
                              />
                            ) : (
                              <RxAvatar size={30} color={'#25324B'}/>
                            )}
                              {' '}
                            <Flex alignItems={"start"} flexDirection={"column"}>
                              <Text m='0' color='#2E2C34' fontWeight='medium' fontSize="medium">
                                {item.full_name}
                              </Text>
                            </Flex>
                          </Flex>
                        </Td>
                        <Td>{item.leave_type}</Td>
                        
                        <Td>
                          <button
                            h='8'
                            bg='white'
                            border={
                              item.status === "sucessful"
                                ? "1px solid #388B41"
                                : item.status === "pending"
                                ? "1px solid #FFA043"
                                : item.status === "declined"
                                ? "1px solid #FC3400"
                                : null
                            }
                             className={`text-sm font-normal ${  item.status === "approved"
                              ? "text-[#388B41]"
                              : item.status === "pending"
                              ? "text-[#FFA043]"
                              : item.status === "declined"
                              ? "text-[#FC3400]"
                              : null}`}>
                            {item.status}
                          </button>
                        </Td>

                        <Td>{formatDate(item.date)}</Td>
                        <Td>{item.leave_duration}</Td>
                        <Td>
                      <Link
                            
                            to={`${item.leave_type}/details/${item.id}`}
                             state={{ from: "occupation" }}
                            >
                            <button
                             
                              className="text-sm bg-[#EBEAED] font-normal border px-3 py-2 border-[#984779] text-[#984779]"
                              >
                              See Application
                            </button>
                          </Link>
                         
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>

                {/* Table for all the leaves applied */}

                </Table>
              </TableContainer>
            </TabPanel>
            
            <TabPanel>
              <TableContainer>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>
                        <InputGroup>
                          <InputLeftElement pointerEvents='none'>
                            <CiSearch color='gray.300' />
                          </InputLeftElement>
                          <Input placeholder='Search employee..' />
                        </InputGroup>
                      </Th>
                      <Th>
                        <Text>Leave type</Text>
                      </Th>
                      <Th>
                        <Text>Stage</Text>
                      </Th>
                      <Th>
                        <Text>Date Applied</Text>
                      </Th>
                      <Th>
                        <Text>No. of Days</Text>
                      </Th>
                      <Th>
                        <Text>Action</Text>
                      </Th>
                    </Tr>
                  </Thead>

                 {/* Table for all the leaves applied that are pending  */}

                  <Tbody>
                  {filteredData?.map((item) => (

                      <Tr key={item.id}>
                        <Td>
                          <Flex gap='3' alignItems={"center"}>
                            {item.image ? (
                              <Avatar
                                size='sm'
                                src={item.image}
                              />
                            ) : (
                              <RxAvatar size={30} color={'#25324B'}/>
                            )}
                              {' '}
                            <Flex alignItems={"start"} flexDirection={"column"}>
                              <Text m='0' color='#2E2C34' fontWeight='medium' fontSize="medium">
                                {item.full_name}
                              </Text>
                            </Flex>
                          </Flex>
                        </Td>
                        <Td>{item.leave_type}</Td>
                        <Td>
                          <Button
                            h='8'
                            bg='white'
                            border={
                              item.status === "sucessful"
                                ? "1px solid #388B41"
                                : item.status === "pending"
                                ? "1px solid #FFA043"
                                : item.status === "declined"
                                ? "1px solid #FC3400"
                                : null
                            }
                            color={
                              item.status === "sucessful"
                                ? "#388B41"
                                : item.status === "pending"
                                ? "#FFA043"
                                : item.status === "declined"
                                ? "#FC3400"
                                : null
                            }>
                            {item.status}
                          </Button>
                        </Td>
                        <Td>{formatDate(item.date)}</Td>
                        <Td>{item.leave_duration}</Td>
                        <Td>
                          <Link
                            to={`${item.leave_type}/details/${item.id}`}>
                            <Button
                              bg={"#EBEAED"}
                              border={"1px solid #984779"}
                              color='#984779'>
                              See Application
                            </Button>
                          </Link>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>

                  {/* Table for all the leaves applied that are pending  */}

                </Table>
              </TableContainer>
            </TabPanel>

            <TabPanel>
              <TableContainer>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>
                        <InputGroup>
                          <InputLeftElement pointerEvents='none'>
                            <CiSearch color='gray.300' />
                          </InputLeftElement>
                          <Input placeholder='Search employee..' />
                        </InputGroup>
                      </Th>
                      <Th>
                        <Text>Leave type</Text>
                      </Th>
                      <Th>
                        <Text>Stage</Text>
                      </Th>
                      <Th>
                        <Text>Date Applied</Text>
                      </Th>
                      <Th>
                        <Text>No. of Days</Text>
                      </Th>
                      <Th>
                        <Text>Action</Text>
                      </Th>
                    </Tr>
                  </Thead>

                 {/* Table for all the leaves applied that are Approved  */}

                  <Tbody>
                  {filteredData?.map((item) => (
                      <Tr key={item.id}>
                        <Td>
                          <Flex gap='3' alignItems={"center"}>
                            {item.image ? (
                              <Avatar
                                size='sm'
                                src={item.image}
                              />
                            ) : (
                              <RxAvatar size={30} color={'#25324B'}/>
                            )}
                              {' '}
                            <Flex alignItems={"start"} flexDirection={"column"}>
                              <Text m='0' color='#2E2C34' fontWeight='medium' fontSize="medium">
                                {item.full_name}
                              </Text>
                            </Flex>
                          </Flex>
                        </Td>
                        <Td>{item.leave_type}</Td>
                        <Td>
                          <Button
                            h='8'
                            bg='white'
                            border={
                              item.status === "sucessful"
                                ? "1px solid #388B41"
                                : item.status === "pending"
                                ? "1px solid #FFA043"
                                : item.status === "declined"
                                ? "1px solid #FC3400"
                                : null
                            }
                            color={
                              item.status === "sucessful"
                                ? "#388B41"
                                : item.status === "pending"
                                ? "#FFA043"
                                : item.status === "declined"
                                ? "#FC3400"
                                : null
                            }>
                            {item.status}
                          </Button>
                        </Td>
                        <Td>{formatDate(item.date)}</Td>
                        <Td>{item.leave_duration}</Td>
                        <Td>
                          <Link
                            to={`${item.leave_type}/details/${item.id}`}>
                            <Button
                              bg={"#EBEAED"}
                              border={"1px solid #984779"}
                              color='#984779'>
                              See Applicant
                            </Button>
                          </Link>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>

                  {/* Table for all the leaves applied that are approved  */}

                </Table>
              </TableContainer>
            </TabPanel>
            
            <TabPanel>
              <TableContainer>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>
                        <InputGroup>
                          <InputLeftElement pointerEvents='none'>
                            <CiSearch color='gray.300' />
                          </InputLeftElement>
                          <Input placeholder='Search employee..' />
                        </InputGroup>
                      </Th>
                      <Th>
                        <Text>Leave type</Text>
                      </Th>
                      <Th>
                        <Text>Stage</Text>
                      </Th>
                      <Th>
                        <Text>Date Applied</Text>
                      </Th>
                      <Th>
                        <Text>No. of Days</Text>
                      </Th>
                      <Th>
                        <Text>Action</Text>
                      </Th>
                    </Tr>
                  </Thead>

                 {/* Table for all the leaves applied that are declined  */}
                  <Tbody>
                  {filteredData?.map((item) => (
                      <Tr key={item.id}>
                        <Td>
                          <Flex gap='3' alignItems={"center"}>
                            {item.image ? (
                              <Avatar
                                size='sm'
                                src={item.image}
                              />
                            ) : (
                              <RxAvatar size={30} color={'#25324B'}/>
                            )}
                              {' '}
                            <Flex alignItems={"start"} flexDirection={"column"}>
                              <Text m='0' color='#2E2C34' fontWeight='medium' fontSize="medium">
                                {item.full_name}
                              </Text>
                            </Flex>
                          </Flex>
                        </Td>
                        <Td>{item.leave_type}</Td>
                        <Td>
                          <Button
                            h='8'
                            bg='white'
                            border={
                              item.status === "approved"
                                ? "1px solid #984779"
                                : item.status === "pending"
                                ? "1px solid #FFA043"
                                : item.status === "declined"
                                ? "1px solid #FC3400"
                                : null
                            }
                            color={
                              item.status === "approved"
                                ? "#984779"
                                : item.status === "pending"
                                ? "#FFA043"
                                : item.status === "declined"
                                ? "#FC3400"
                                : null
                            }>
                            {item.status}
                          </Button>
                        </Td>
                        <Td>{formatDate(item.date)}</Td>
                        <Td>{item.leave_duration}</Td>
                        <Td>
                          <Link
                            to={`${item.leave_type}/details/${item.id}`}>
                            <Button
                              bg={"#EBEAED"}
                              border={"1px solid #984779"}
                              color='#984779'>
                              See Applicant
                            </Button>
                          </Link>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>

                {/* Table for all the leaves applied that are declined  */}

                </Table>
              </TableContainer>
            </TabPanel>

            {data && data.data && data?.data?.length > 0 && (
              <div className='row px-4'>
                <Box display="flex" justifyContent="space-between" w="100%" p='3%' borderBottom={"0.5px solid #eee"}> 
                  <div className="flex justify-center text-gray-500 text-sm">
                    <span className="mr-2">
                      Showing {data?.meta?.from} - {data.meta?.to}{" "}
                      of {data?.meta?.total} results
                    </span>
                    <span className="mr-2">|</span>
                    <span className="mr-2">
                      Page {data?.meta?.current_page} of {data?.meta?.last_page}
                    </span>
                    <span className="mr-2">|</span>
                  </div>
                  <div className='col-lg-4'>
                  <div className='d-flex justify-content-end py-2 px-2'>
                    <h1>
                    
                      <nav aria-label='Page navigation example'>
                        <ul class='pagination'>
                          <li className={`page-item cursor-pointer ${data?.meta?.current_page === 1 ? 'disabled' : ''}`}>
                            <p className='page-link'  onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={data.links.prev === null || data?.meta?.current_page === 1 || isPreviousData}>
                              <span aria-hidden='true'>Prev</span>
                            </p>
                          </li>

                          

                          <li className={`page-item cursor-pointer ${data?.meta?.current_page === data?.meta?.last_page ? 'disabled' : ''}`}>
                            <p className='page-link' onClick={() => setPage(prev => prev + 1)}
                      disabled={data.links.next === null || data?.meta?.current_page === data?.meta?.last_page || isPreviousData}>
                              <span aria-hidden='true'>Next</span>
                            </p>
                          </li>
                        </ul>
                      </nav>
                      
                    </h1>
                    </div>
                  </div>
                </Box>
                <div className='col-lg-4 '></div>
                
              </div>
            )}
          </TabPanels>
        </Tabs>
        
      </Box>
    </Box>
    
      )}
  </div>
  );
};

export default Leave;
