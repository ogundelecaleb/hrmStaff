import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../api";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../../../../utils/utils";
import { enqueueSnackbar } from "notistack";
import { Filter } from "iconsax-react";

const Resumption = () => {
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [userDetails, setUserDetails] = useState(null);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [pf, setPf] = useState("")
  const navigate = useNavigate();

  async function fetchUserDetails() {
    try {
      const userDetails = await getUserDetails();
      setUserDetails(userDetails);
      console.log("userDetails", userDetails);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  }
  useEffect(() => {
    fetchUserDetails();
  }, []);

  async function getResumption(page) {
    try {
      const role = userDetails?.data?.role;

      if (["HNASEJ"].includes(role)) {
        // Fetch data for 'HOD' or 'HNASEJ' role
        const response = await api.getNasejResumption({ params: { page, first_name:firstName } });
        return response;
      } else if (["HNASES"].includes(role)) {
        // Fetch data for 'HOD' or 'HNASES' role
        const response = await api.getNasesResumption({ params: { page } });
        return response;
      } else if (["HOU"].includes(role)) {
        // Fetch data for 'HOD' or 'HOU' role
        const response = await api.getHouResumption({ params: { page } });
        return response;
      } else {
        // Handle other roles or scenarios
        return { data: [] }; // Return empty data or handle differently
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      throw error; // Rethrow the error to be caught by react-query
    }
  }

  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(
    ["getResumption", page, firstName],
    () => getResumption(page),
    {
      keepPreviousData: true,
      //   refetchOnWindowFocus: "always",
      enabled: !!userDetails,
    }
  );
  const resumeData = data?.data || [];

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
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
    <div className="p-4 md:p-6">
     <h3  className="text-lg font-semibold">Leave Resumption</h3> 
      <div className="flex items-center gap-4 overflow-x-auto custom-scrollbar mt-4">
        <Filter color="purple" variant="Bold"/>
            <input
              type="text"
              placeholder="First Name"
              className="w-[200px] h-[36px] bg-[#F9FAFB]  px-2 py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#667185] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#9326ae] focus:border-[#9326ae] "
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
               <input
              type="text"
              placeholder="Last Name"
              className="w-[200px] h-[36px] bg-[#F9FAFB]  px-2 py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#667185] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#9326ae] focus:border-[#9326ae] "
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
               <input
              type="text"
              placeholder="PF Number"
              className="w-[200px] h-[36px] bg-[#F9FAFB]  px-2 py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#667185] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#9326ae] focus:border-[#9326ae] "
              value={pf}
              onChange={(e) => setPf(e.target.value)}
            />
            </div>
      <div className="sm:-mx-6 lg:-mx-8 mt-3 ">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px] border-l-[0.8px] border-[#E4E7EC] rounded-lg">
              <thead className="bg-[#F9FAFB]">
                <tr className="">
                  <th
                    scope="col"
                    className="whitespace-nowrap border-b-[0.8px] border-[#E4E7EC] py-[12px] px-3 gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3] font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                  >
                    Staff Name
                  </th>
                  <th
                    scope="col"
                    className="border-b-[0.8px] border-[#E4E7EC] py-[12px] px-3 gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3] font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                  >
                    Leave type
                  </th>
                  <th
                    scope="col"
                    className="border-b-[0.8px] border-[#E4E7EC] py-[12px] px-3 gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3] font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                  >
                    Stage
                  </th>
                  <th
                    scope="col"
                    className="border-b-[0.8px] border-[#E4E7EC] py-[12px] px-3 gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3] font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                  >
                    Start Date
                  </th>
                  <th
                    scope="col"
                    className="border-b-[0.8px] border-[#E4E7EC] py-[12px] px-3 gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3] font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                  >
                    No. of Days
                  </th>
                  <th
                    scope="col"
                    className="border-b-[0.8px] border-[#E4E7EC] py-[12px] px-3 gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3] font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading && <>loading ...</>}
                {/* {results?.data && results?.data?.data?.length === 0 && (
                  <EmptyWallet
                    cols={8}
                    action={"Invoice"}
                    subheading={"Your invoices will appear here."}
                    paymentlinkbutton={true}
                  />
                )} */}

                {resumeData &&
                  resumeData?.map((result) => (
                    <tr key={result.id} className="mb-2 hover:bg-light-gray">
                      <td
                        onClick={() =>
                          navigate("/portal/resumption-details", {
                            state: {
                              details: result,
                            },
                          })
                        }
                        className="whitespace-nowrap uppercase cursor-pointer flex items-center text-center text-primary underline  py-[16px] bg-white px-3 border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium"
                      >
                        {result?.leave?.user_image && (
                          <img
                            src={result?.leave?.user_image}
                            className="h-6 w-6 rounded-full"
                          />
                        )}

                        {result?.leave?.full_name}
                      </td>
                      <td className="whitespace-nowrap text-center py-[16px] bg-white px-3 border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium">
                        {result?.leave?.leave_type}
                      </td>
                      <td className="whitespace-nowrap text-center py-[16px] bg-white px-3 border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium">
                        <button
                          className={`rounded-[20px] md:rounded-[40px] w-[60px] md:w-[74px] py-[2px] md:py-[4px] mx-auto ${
                            result.approval_status === "pending"
                              ? "bg-[rgb(255,245,230)] text-[#FF9800]"
                              : result.approval_status === "Ongoing"
                              ? "bg-[#F9FAFB] text-[#667185]"
                              : "bg-[#EDF7EE] text-[#4CAF50]"
                          } text-[10px] md:text-[12px] font-semibold leading-[16px] md:leading-[18px]`}
                        >
                          {result?.approval_status}
                        </button>
                      </td>
                      <td className="whitespace-nowrap text-center py-[16px] bg-white px-3 border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium">
                        {formatDate(result?.leave?.start_date)}
                      </td>
                      <td className="whitespace-nowrap text-center py-[16px] bg-white px-3 border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium">
                        {result?.leave?.leave_duration}
                      </td>
                      <td className="whitespace-nowrap text-center py-[16px] bg-white px-3 border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium">
                        <button   onClick={() =>
                          navigate("/portal/resumption-details", {
                            state: {
                              details: result,
                            },
                          })
                        } className="px-2 py-[6px] bg-purple-800 hover:bg-purple-700 text-white rounded-md">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resumption;
