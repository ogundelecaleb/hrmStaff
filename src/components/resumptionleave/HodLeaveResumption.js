import { Note1 } from "iconsax-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const HodLeaveResumption = ({ isLoading, resumeData }) => {
  const navigate = useNavigate();
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return (
    <div>
      {" "}
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
                {resumeData?.length === 0 && (
                  <td cols={6} className="text-center py-12">
                    <Note1 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <div className="text-sm text-muted-foreground">
                      No Resumption Application Available
                    </div>
                  </td>
                )}

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
                        <button
                          onClick={() =>
                            navigate("/portal/resumption-details", {
                              state: {
                                details: result,
                              },
                            })
                          }
                          className="px-2 py-[6px] bg-purple-800 hover:bg-purple-700 text-white rounded-md"
                        >
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

export default HodLeaveResumption;
