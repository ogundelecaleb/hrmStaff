import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchNormal1, staff, RecordCircle, ArrowDown2 } from "iconsax-react"; // Replace with your icon library
import api from "../api";

const StaffListModal = ({selectedOffice, setSelectedOffice, officeName}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStaffs, setFilteredOffice] = useState([]);
//   const [selectedOffice, setSelectedOffice] = useState(null);
  const [staffsVisible, setStaffsVisible] = useState(false);

  const { data: staffs, isLoading } = useQuery(["staffs"], () => api.getAllStaffs(), {
    refetchOnWindowFocus: false,
  });

    async function fetchAllOffice(page) {
      const response = await api.fetchAllOffice()
      return response;
    }
  
    const results = useQuery(["getOffices"], () => fetchAllOffice(), {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    });
    const offices = results.data?.data || [];

  useEffect(() => {
    if (offices) {
      // const sortedOffice = [...offices].sort((a, b) =>
      //   a.name === "Access staff" ? -1 : b.name === "Access staff" ? 1 : 0
      // );
      setFilteredOffice(offices);
    }
  }, [offices]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (offices) {
      const filtered = offices.filter((staff) =>
        staff.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredOffice(filtered);
    }
  };

  const handleSelectStaff = (staff) => {
    setSelectedOffice(staff);
    setStaffsVisible(false);
    setSearchQuery("");
  };

  return (
    <div className="mb-[12px] md:mb-[18px]">

     
      <button
        onClick={() => setStaffsVisible(!staffsVisible)}
        className="w-full h-[38px] bg-[#fefefe] pl-[10px] pr-[8px] flex  justify-between py-[8px] text-[14px] text-[#344054] border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:border-[#984779]"
      >
        <div className="flex-row staffs-center">
          {selectedOffice ? (
            <p className="text-[#272F35] text-[12px]">{selectedOffice.name}</p>
          ) : (
            <p className="text-[#838383] text-[12px]">Select an office </p>
          )}
        </div>
        <ArrowDown2 size={14} color="#838383" variant="Linear" />
      </button>

      {staffsVisible && (
        <div
         
          className="w-full h-[300px] overflow-y-auto px-2 py-3 bg-slate-50 border-[#D0D5DD] border-[0.2px] rounded-[8px]"
        >
          <div className="relative w-full mb-2 flex items-center">
            <SearchNormal1 size="14" color="#98A2B3"
             className="absolute left-[16px] " />
            <input
              type="text"
              placeholder="search office"
              className="w-full h-[36px] text-[12px] pl-[44px] py-[8px] bg-[#F7F9FC] border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {filteredStaffs.map((staff, index) => (
            <button
              key={index}
              onClick={() => handleSelectStaff(staff)}
              className="w-full px-[10px] py-2 rounded-[10px] flex items-center justify-between mb-2"
              style={{ borderColor: "rgba(18, 3, 58, 0.10)", borderWidth: 0.2 }}
            >
              <div className="flex items-center">
               
                <p className="text-[#272F35] text-[12px] mb-0">{staff.name}</p>
              </div>
              {selectedOffice?.id === staff.id ? (
                <RecordCircle size="16" color="#984779" variant="Bold" />
              ) : (
                <RecordCircle size="16" color="#DEDEDE" variant="Bold" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffListModal;