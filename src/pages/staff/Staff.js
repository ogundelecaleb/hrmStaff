import { Box } from "@chakra-ui/react";
import React from "react";
import { MdPeople } from "react-icons/md";
import StaffCard from "../../components/staffcard/StaffCard";

const Staff = ({ navigate }) => {
  return (
    <Box pl='14'>
      <StaffCard
        label={" Staff Appointment  "}
        Icon={<MdPeople size={24} color='#984779' />}
        CardBgColor={"#E4C0D3"}
        labelColor={"#984779"}
        IconBorderColor={"#984779"}
        Action={() => navigate("staff-appointment")}
      />
      <StaffCard
        label={"Staff Appraisal "}
        Icon={<MdPeople size={24} color='EDF2F7' />}
        CardBgColor={"#17082DF0"}
        labelColor={"#EDF2F7"}
        IconBorderColor={"#EDF2F7"}
        Action={() => navigate("staff-appraisal")}
      />
    </Box>
  );
};

export default Staff;
