import { Box, SimpleGrid } from "@chakra-ui/react";
import { BsCheckCircle } from "react-icons/bs";
import { MdPeople } from "react-icons/md";
import { TbFileImport } from "react-icons/tb";
import HodStaffCard from "../../../components/staffcard/HodStaffCard";

const LeaveAppointment = ({ navigate }) => {
  return (
    <Box px='6' mt='4' >
      <SimpleGrid columns={{base: 1, md:2}} spacing={{base: 3, md:5}}>
        <HodStaffCard
          label={"My Leave Applications"}
          Icon={<MdPeople size={24} color='#EDF2F7' />}
          CardBgColor={"#6aa84f"}
          labelColor={"#EDF2F7"}
          IconBorderColor={"#EDF2F7"}
          Action={() => navigate("my-leave-applications")}
        />
        <HodStaffCard
          label={"Apply for Leave"}
          Icon={<MdPeople size={24} color='EDF2F7' />}
          CardBgColor={"#741b47"}
          labelColor={"#EDF2F7"}
          IconBorderColor={"#EDF2F7"}
          Action={() => navigate("leave-application")}
        />
        <HodStaffCard
          label={"Resumption from leave"}
          Icon={<MdPeople size={24} color='#984779' />}
          CardBgColor={"#E4C0D3"}
          labelColor={"#984779"}
          IconBorderColor={"#984779"}
          Action={() => navigate("leave-resumption")}
        />
        <HodStaffCard
          label={"Resumption Applications"}
          Icon={<MdPeople size={24} color='EDF2F7' />}
          CardBgColor={"#17082DF0"}
          labelColor={"#EDF2F7"}
          IconBorderColor={"#EDF2F7"}
          Action={() => navigate("my-leave-resumption")}
        />
      </SimpleGrid>
    </Box>
  );
};
export default LeaveAppointment;
