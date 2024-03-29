import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { BsCheckCircle } from "react-icons/bs";
import { MdPeople } from "react-icons/md";
import { TbFileImport } from "react-icons/tb";
import StaffCard from "../../../../components/staffcard/StaffCard";

const StaffAppointment = ({ navigate }) => {
  return (
    <Box pl='6' mt='4' >
      <SimpleGrid columns={3} spacing={5}>
        <StaffCard
          label={"All Applications"}
          Icon={<MdPeople size={24} color='#EDF2F7' />}
          CardBgColor={"#6aa84f"}
          labelColor={"#EDF2F7"}
          IconBorderColor={"#EDF2F7"}
          Action={() => navigate("all-applications")}
        />
        {/* <StaffCard
          label={"Resumption of Duty"}
          Icon={<MdPeople size={24} color='EDF2F7' />}
          CardBgColor={"#741b47"}
          labelColor={"#EDF2F7"}
          IconBorderColor={"#EDF2F7"}
          Action={() => navigate("resumption-of-leave")}
        /> */}
        <StaffCard
          label={"Staff Profile(Certification of Assumption of Duty)"}
          Icon={<MdPeople size={24} color='#984779' />}
          CardBgColor={"#E4C0D3"}
          labelColor={"#984779"}
          IconBorderColor={"#984779"}
          Action={() => navigate("appointment-request")}
        />
        <StaffCard
          label={" Regularization of Temporary Appointment  "}
          Icon={<MdPeople size={24} color='EDF2F7' />}
          CardBgColor={"#17082DF0"}
          labelColor={"#EDF2F7"}
          IconBorderColor={"#EDF2F7"}
          Action={() => navigate("appointment-regularization")}
        />
        <StaffCard
          label={" Confirmation of Appointment"}
          Icon={<BsCheckCircle size={24} color='EDF2F7' />}
          CardBgColor={"#0F0583"}
          labelColor={"#EDF2F7"}
          IconBorderColor={"#EDF2F7"}
          Action={() => navigate("confirmation-of-appointment")}
        />
        <StaffCard
          label={"Withdrawal of Appointment"}
          Icon={<TbFileImport size={24} color='EDF2F7' />}
          CardBgColor={"#FC3400"}
          labelColor={"#EDF2F7"}
          IconBorderColor={"#EDF2F7"}
          Action={() => navigate("withdrawal")}
        />
      </SimpleGrid>
    </Box>
  );
};
export default StaffAppointment;
