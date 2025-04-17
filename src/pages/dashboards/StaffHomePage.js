import React, { useState, useEffect } from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { Md6K } from "react-icons/md";
import { Link } from "react-router-dom";
import { getUserDetails } from "../../utils/utils";
import { useSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import {
  Ankr,
  ArrowForwardSquare,
  ArrowRight,
  NoteRemove,
} from "iconsax-react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";
import StaffListModal from "../../components/OfficeList";

const StaffHomePage = ({ switchRoutes, navigate }) => {
  // const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [userDetails, setUserDetails] = useState([]);
  const [role, setRole] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState("")
  async function fetchUserDetails() {
    try {
      const userDetails = await getUserDetails();
      setUserDetails(userDetails.data);
      setRole(userDetails?.data?.role);
    } catch (error) {
      console.error("Error fetching your basic details");
      // enqueueSnackbar(error.message, { variant: 'error' })
    }
  }
  useEffect(() => {
    fetchUserDetails();
    // setIsDisabled(true);
  }, []);

  async function getLeaves(page) {
    const response = await api.fetchMyLeaves({ params: { page } });
    return response;
  }

  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(
    ["leaveRequests", page],
    () => getLeaves(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  async function getdLeaves(page) {
    try {
      const userDetails = await getUserDetails();
      const role = userDetails.data.role;

      if (["CS"].includes(role)) {
        // Fetch data for 'DEAN', 'CS', role
        const response = await api.fetchCsLeaves({ params: { page } });
        return response;
      } else if (["PT"].includes(role)) {
        // Fetch data for 'PT' role
        const response = await api.fetchPtLeaves({ params: { page } });
        return response;
      } else if (["DEAN"].includes(role)) {
        // Fetch data for 'PT' role
        const response = await api.fetchDnLeaves({ params: { page } });
        return response;
      } else if (["HOD"].includes(role)) {
        // Fetch data for 'HOD' or 'HOU' role
        const response = await api.fethDepartmentLeave({ params: { page } });
        return response;
      } else if (["DPT"].includes(role)) {
        // Fetch data for 'HOD' or 'DPT' role
        const response = await api.fetchDptLeaves({ params: { page } });
        return response;
      } else if (["HNASEJ"].includes(role)) {
        // Fetch data for 'HOD' or 'HNASEJ' role
        const response = await api.fetchHnasejLeaves({ params: { page } });
        return response;
      } else if (["HNASES"].includes(role)) {
        // Fetch data for 'HOD' or 'HNASES' role
        const response = await api.fetchHnasesLeaves({ params: { page } });
        return response;
      } else if (["HOU"].includes(role)) {
        // Fetch data for 'HOD' or 'HOU' role
        const response = await api.fethUnitLeave({ params: { page } });
        return response;
      } else {
        // Handle other roles or scenarios
        return { data: [] }; // Return empty data or handle differently
      }
    } catch (error) {
      console.error("Error fetching leave data", error);
      enqueueSnackbar(error.message, { variant: "error" });
      throw error; // Rethrow the error to be caught by react-query
    }
  }

  const supervisorLeaves = useQuery(
    ["leaveRequest", page],
    () => getdLeaves(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  const calculateProgress = () => {
    const fieldsToCheck = [
      "first_name",
      "last_name",
      "email",
      "permanent_address",
      "phone",
      "date_of_birth",
      "nationality",
      "state_of_origin",
      "gender",
      "marital_status",
      "contact_address",
      "date_of_first_appointment",
      // "beneficiary_full_name",
      "staff_academic_qualification",
    ];
    const filledFields = fieldsToCheck.reduce((count, field) => {
      if (
        userDetails[field] !== null &&
        userDetails[field] !== undefined &&
        userDetails[field] !== ""
      ) {
        count++;
      }
      return count;
    }, 0);
    const progressPercentage = (filledFields / fieldsToCheck.length) * 100;
    return Math.round(progressPercentage);
  };

  const progress = calculateProgress();

  async function updateProgress() {
    try {
      const response = await api.trackProgress({
        progress_bar: progress,
        staff_id: userDetails?.id,
      });
    } catch (error) {}
  }

  useEffect(() => {
    if (progress < 100 && userDetails) {
      updateProgress();
    }
  }, [progress, userDetails]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }



  const submitSupervisor = async () => {
    if (!selectedOffice) {
      enqueueSnackbar("Please select a supervisor office", {
        variant: "error",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await api.selectSupervisor({
        supervisor_office_id: selectedOffice?.id,
      });
      enqueueSnackbar("Supervisor Update Successfully", { variant: "success" });
      setLoading(false);
      fetchUserDetails();

    } catch (error) {
      setLoading(false);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const DashbordBox = ({ title, total, icon, route, desc }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(route);
    };

    return (
      <div className="border rounded-lg flex justify-between flex-col shadow overflow-hidden ">
        <div className="flex justify-between  items-center  p-2">
          <p className="text-sm md:text-base font-semibold ">{title}</p>
          <div>{icon}</div>
        </div>

        <div className="mt-7 ">
          {/* <p className="text-[#718096] p-2">
            {desc}
          </p> */}
          <div className="p-2 bg-gray-100 flex justify-between items-center">
            <p className="font-semibold">Total: </p>

            <p className="text-lg font-semibold">{total}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-[16px] md:px-[28px]">
      <Modal isOpen={isDisabled} onClose={() => console.log("close")}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Site Disabled!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            The deadline for submitting your information has now passed. Please
            hold off on further submissions while awaiting confirmation of an
            extension from the College Secretary. Once the extension is
            approved, further instructions will be provided.
            <br />
            <br /> Thank you for yout patience{" "}
          </ModalBody>

          <ModalFooter gap="5">
            <Link to="/">
              <Button
                px={10}
                //colorScheme="purple"
                bg={"#984779"}
                textColor={"white"}
                onClick={() => {
                  // onClose();
                  api.logout();
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </Link>
            {/* <Button  variant='ghost' width={"100px"}>
                            {loading ? <Spinner /> : "No"}
                        </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <p className="text-[#121212] text-[18px] md:text-[20px] font-semibold mt-4 ">
        Hello, {userDetails?.first_name} {userDetails?.last_name}
      </p>
      {!(
        role === "HOD" ||
        role === "DEAN" ||
        role === "HOU" ||
        role === "CS" ||
        role === "PT" ||
        role === "DPT" ||
        role === "HNASES" ||
        role === "HNASEJ"
      ) && (
        <>
          <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
            <DashbordBox
              title={"Leave Applications"}
              total={data?.meta?.total ? data?.meta?.total : "0"}
              // desc={"View, Create and Update Staff Details"}
              icon={
                <NoteRemove
                  color="#984779"
                  className="text-16 md:text-[20px]"
                  variant="Bold"
                />
              }
              route=""
            />

            <DashbordBox
              title={"Total Leave Due"}
              total={userDetails.total_leave_due}
              // desc={"View, Create and Update Staff Details"}
              icon={
                <Ankr
                  color="#984779"
                  className="text-16 md:text-[20px]"
                  variant="Bold"
                />
              }
              route=""
            />

            <DashbordBox
              title={"Leave From Previous Year"}
              total={userDetails.last_year_leave}
              // desc={"View, Create and Update Staff Details"}
              icon={
                <ArrowForwardSquare
                  color="#984779"
                  className="text-16 md:text-[20px]"
                  variant="Bold"
                />
              }
              route=""
            />
          </div>
          <div className="w-full max-w-[520px] mt-[24px] rounded-md bg-[#984779] bg-opacity-50 py-3 px-2 flex flex-col">
            <p className="text-center text-sm font-semibold">Quick Action</p>

            <p className=" my-[18px] text-sm font-semibold">
              Current Immediate Supervisor Office:{" "}
              <span className="text-base">
                {userDetails?.supervisor_office?.name}
              </span>
            </p>
            <div className="">

              <label className="text-[14px] text-[#242527] leading-[20px]   mb-[8px]">
                Select Immediate Supervisor Office{" "}
              </label>
             
            <StaffListModal
              selectedOffice={selectedOffice}
              setSelectedOffice={setSelectedOffice}
            />
            </div>

            <button
              onClick={submitSupervisor}
              className="px-3 py-2 w-full text-center mt-8 rounded-md  bg-[#984779] hover:bg-opacity-70 text-white "
            >
              {loading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Submit </>
              )}
            </button>
          </div>
          {progress < 100 && (
            <div
              className="shadow flex flex-wrap justify-between gap-[16px] md:gap-[24px] rounded-1 py-3 md:py-5 px-3 mt-5 flex-row border"
              style={{ border: "1px solid #EFF4F8", borderRadius: 10 }}
            >
              <div className=" ">
                {" "}
                <CircularProgress
                  value={progress}
                  thickness="6"
                  size="75"
                  color="green.400"
                >
                  <CircularProgressLabel>{progress}%</CircularProgressLabel>
                </CircularProgress>
              </div>
              <div className=" gap-2 flex-1">
                <div className=" ps-2" id="zero-padding">
                  <p className="text-sm md:text-lg font-semibold" id="res">
                    Complete all Process
                  </p>

                  <p className="text-sm md:text-base" id="res">
                    Your personal records profile is
                    <span className="text-warning"> {progress}% </span>{" "}
                    completed
                  </p>
                </div>
              </div>
              <div className=" ">
                <Link to={`personal-records`}>
                  <button className="px-3 py-2 rounded-md border bg-[#984779] hover:bg-opacity-70 text-white ">
                    Complete Profile
                  </button>
                </Link>
              </div>
            </div>
          )}
          <div className="rounded-lg overflow-hidden border-[0.8px] border-[#E4E7EC] mt-5 md:mt-9">
            <div className="flex items-center justify-between bg-white p-3">
              <p className=" text-[16px] md:text-lg mb-0 text-[#000] leading-[24px] font-medium text-left ">
                Recent Leave Applications
              </p>
              <Link to="/leave/my-leave-applications">
                <button className="flex items-center gap-2">
                  {" "}
                  <p className=" text-[12px] md:text-base mb-0  text-[#984779]  font-medium text-left ">
                    View all applications
                  </p>
                  <ArrowRight size="16" variant="Linear" color="#984779" />
                </button>
              </Link>
            </div>
            <div class="overflow-x-auto rounded-lg">
              <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
                <thead className="bg-light-gray">
                  <tr className="">
                    <th
                      scope="col"
                      className=" px-2 whitespace-nowrap md:px-5 border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex pl-2  gap-[6px] md:gap-[12px] items-center my-0">
                        Leave Type
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-2 md:px-5 whitespace-nowrap  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Leave Duration
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-2 md:px-5 whitespace-nowrap  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        Start Date
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-2 md:px-5 whitespace-nowrap  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        Status
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-2 md:px-5 whitespace-nowrap  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        Action
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && <div>Loading...</div>}
                  {data?.data?.length === 0 && (
                    <tr>
                      <td className="text-center" colspan="6">
                        <img
                          src="./nodata.gif"
                          className="mx-auto mt-6 h-[70px] "
                          alt=""
                        />
                        <h3 className="text-base md:text-lg  xl:text-[30px] leading-[35px]  text-[#1A202C] font-extrabold mb-[6px]">
                          No Leave Application Avalable
                        </h3>
                      </td>
                    </tr>
                  )}
                  {data &&
                    data?.data?.map((result, index) => (
                      <tr key={index} className="mb-2 hover:bg-light-gray">
                        <td className="whitespace-nowrap py-[16px] bg-white pl-2 pr-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {result?.leave_type}
                        </td>

                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {result?.leave_duration}
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5 text-center   border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium   ">
                          {formatDate(result?.start_date)}
                        </td>

                        <td className="whitespace-nowrap py-[16px] bg-white flex justify-center   px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {" "}
                          <button
                            className={`rounded-[20px] md:rounded-[40px] flex justify-center items-center gap-2 px-[12px]  py-[4px] md:py-[4px] border-[0.5px] ${
                              result?.status === "declined"
                                ? "bg-[#FEECEB] text-[#F44336] border-[#F44336]"
                                : result?.status === "pending"
                                ? "bg-[#FFF5E6] text-[#F44336] border-[#FF9800]"
                                : "bg-[#EDF7EE] text-[#4CAF50] border-[#4CAF50]"
                            }  text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px] `}
                          >
                            <p className="mb-0">{result?.status}</p>
                          </button>{" "}
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {result?.status === "approved" ? (
                            <Link to="/leave-certificate" state={result}>
                              {" "}
                              <button
                                // onClick={() =>
                                //   navigate("leave-certificate", {
                                //     state: result?.leave_type
                                //   })
                                // }
                                onClick={() => console.log("------>>>", result)}
                                className="text-[#984779] px-3 py-1 rounded-md border hover:bg-gray-300  "
                              >
                                View Certificate
                              </button>
                            </Link>
                          ) : (
                            <p className="text-center">...</p>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>{" "}
        </>
      )}

      {(role === "HOD" ||
        role === "DEAN" ||
        role === "HOU" ||
        role === "CS" ||
        role === "PT" ||
        role === "DPT" ||
        role === "HNASES" ||
        role === "HNASEJ") && (
        <>
          <div className="grid grid-cols-2 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <div className="border-[0.2px] border-[#98a2b3] rounded-[8px] p-2 xl:p-3">
              <div>
                <div
                  className="mt-4 border rounded-3 d-grid bg-[#984779] h-[32px] w-[32px] md:h-[40px] md:w-[40px]"
                  style={{
                    placeItems: "center",
                  }}
                >
                  <NoteRemove className="h-[20px] md:h-[32px]" color="white" />
                </div>
                <p className="fs-4  fw-semibold">
                  {supervisorLeaves?.data?.data?.length}
                </p>
                <p
                  className="fs-6 text-muted fw-normal"
                  style={{ marginTop: "-10px" }}
                >
                  Staffs Leave Applications
                </p>
              </div>
            </div>
            <div className="border-[0.2px] border-[#98a2b3] rounded-[8px] p-2 xl:p-3">
              <div>
                <div
                  className="mt-4 border rounded-3 d-grid bg-[#984779] h-[32px] w-[32px] md:h-[40px] md:w-[40px]"
                  style={{
                    placeItems: "center",
                  }}
                >
                  <Ankr className="h-[20px] md:h-[32px]" color="white" />
                </div>
                <p className="fs-4 mt-2 fw-semibold">{"0"}</p>
                <p
                  className="fs-6 text-muted fw-normal"
                  style={{ marginTop: "-10px" }}
                >
                  Staffs Regularization Application
                </p>
              </div>
            </div>{" "}
            <div className="border-[0.2px] border-[#98a2b3] rounded-[8px] p-2 xl:p-3">
              <div>
                <div
                  className="mt-4 border rounded-3 d-grid bg-[#984779] h-[32px] w-[32px] md:h-[40px] md:w-[40px]"
                  style={{
                    placeItems: "center",
                  }}
                >
                  <ArrowForwardSquare
                    className="h-[20px] md:h-[32px]"
                    color="white"
                  />
                </div>
                <p className="fs-4 mt-2 fw-semibold"> {"0"}</p>
                <p
                  className="fs-6 text-muted fw-normal"
                  style={{ marginTop: "-10px" }}
                >
                  Staff Appointment Application
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden border-[0.8px] border-[#E4E7EC] mt-5 md:mt-9">
            <div className="flex items-center justify-between bg-white p-3">
              <p className=" text-[16px] md:text-lg mb-0 text-[#000] leading-[24px] font-medium text-left ">
                Recent Leave Applications
              </p>
              <Link to="/portal/leave">
                <button className="flex items-center gap-2">
                  {" "}
                  <p className=" text-[14px] md:text-base mb-0  text-[#984779] leading-[24px] font-medium text-left ">
                    View all applications
                  </p>
                  <ArrowRight size="16" variant="Linear" color="#984779" />
                </button>
              </Link>
            </div>
            <div class="overflow-x-auto rounded-lg">
              <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
                <thead className="bg-light-gray">
                  <tr className="">
                    <th
                      scope="col"
                      className=" px-2 md:px-5 border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex pl-2  gap-[6px] md:gap-[12px] items-center my-0">
                        Staff Name
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-2 md:px-5  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Leave Type
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-2 md:px-5  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Leave Duration
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-2 md:px-5  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        Start Date
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-2 md:px-5  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        Status
                      </div>
                    </th>

                    {/* <th
                  scope="col"
                  className="px-2 md:px-5  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                >
                  <div className="flex gap-[6px] md:gap-[12px] items-center my-0">
                    Action
                  </div>
                </th> */}
                  </tr>
                </thead>
                <tbody>
                  {supervisorLeaves?.isLoading && <div>Loading...</div>}
                  {supervisorLeaves?.data?.data?.length === 0 && (
                    <tr>
                      <td className="text-center" colspan="6">
                        <img
                          src="./nodata.gif"
                          className="mx-auto mt-6 h-[70px] "
                          alt=""
                        />
                        <h3 className="text-[30px] leading-[35px]  text-[#1A202C] font-extrabold mb-[6px]">
                          No Leave Application Avalable
                        </h3>
                      </td>
                    </tr>
                  )}
                  {supervisorLeaves?.data &&
                    supervisorLeaves?.data?.data?.map((item, index) => (
                      <tr key={index} className="mb-2 hover:bg-light-gray">
                        <td className="whitespace-nowrap py-[16px] bg-white pl-2 pr-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {item.full_name}{" "}
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {item.leave_type}{" "}
                        </td>

                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {item?.leave_duration}
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5 text-center   border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium   ">
                          {formatDate(item?.start_date)}
                        </td>

                        <td className="whitespace-nowrap py-[16px] bg-white flex justify-center   px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {" "}
                          <button
                            className={`rounded-[20px] md:rounded-[40px] flex justify-center items-center gap-2 px-[12px]  py-[4px] md:py-[4px] border-[0.5px] ${
                              item?.status === "declined"
                                ? "bg-[#FEECEB] text-[#F44336] border-[#F44336]"
                                : item?.status === "pending"
                                ? "bg-[#FFF5E6] text-[#F44336] border-[#FF9800]"
                                : "bg-[#EDF7EE] text-[#4CAF50] border-[#4CAF50]"
                            }  text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px] `}
                          >
                            <p className="mb-0">{item?.status}</p>
                          </button>{" "}
                        </td>
                        {/* <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      <More variant="Linear" color="#667185" size="20" />
                    </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>{" "}
        </>
      )}

      {/* <div className="row mt-4 mb-2">
        <div className="col-lg-8">
          {datar.map((items, key) => {
            return (
              <div
                key={key}
                className="row px-2"
                style={{ position: "relative" }}
              >
                <div className="col-2"></div>
                <div
                  style={{ height: "100px" }}
                  id="card"
                  className="shadow col-10 rounded-3 px-3 pt-3 pb-1 mt-4"
                >
                  <p className="fw-semibold fs-6">{items.title}</p>
                  <p style={{ marginTop: "-10px" }}>{items.message}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-lg-4 ps-5" id="no-padding-res">
          <p className="fs-5 mt-5 fw-semibold" style={{ color: "#984779" }}>
            Upcoming Event
          </p>
          <div>
            <div className="border-bottom pt-3 mt-5">
              <p className="fs-6 mt-1 fw-semibold">Monday, 23 jan 2023</p>
              <p style={{ marginTop: "-10px" }}>Leave commences</p>
            </div>
            <div className="pt-3">
              <p className="fs-6 mt-1 fw-semibold">Monday, 23 jan 2023</p>
              <p style={{ marginTop: "-10px" }}>Leave commences</p>
            </div>
            <div>
              <p
                onClick={switchRoutes}
                className="text-center mt-5 pt-4"
                style={{ color: "#984779" }}
              >
                See all Event
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default StaffHomePage;
