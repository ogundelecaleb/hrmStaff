import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { HiUpload } from "react-icons/hi";
import { MdOutlineRestore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { MoonLoader } from "react-spinners";
import NotificationAnimation from "../../../components/NotificationAnimation";
import api from "../../../api";

export const Notification = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 5;

  async function fetchUserNotification() {
    try {
      setIsLoading(true);
      const message = await api.fetchNotification();
      console.log("Notification Messages:", message);
      setMessage(message.data);
    } catch (error) {
      console.error("Error fetching notifications", error);
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  async function markMeassage() {
    try {
      const markAsRead = await api.markAsRead();
    } catch (error) {
      console.error("Error fetching your basic details");
      // enqueueSnackbar(error.message, { variant: "error" });
    }
  }
  useEffect(() => {
    markMeassage();
  }, []);

  useEffect(() => {
    fetchUserNotification();
  }, []);

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const currentNotifications = message.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (
      <Box
        w={"80vw"}
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
    );
  }

  if (!Array.isArray(message) || message.length === 0) {
    return (
      <Box
        w={"80vw"}
        display="flex"
        flexDirection="column"
        h={"20vh"}
        alignItems="center"
        justifyContent="center"
      >
        <div className="row mt-5 " style={{ height: "10px", width: "80%" }}>
          <NotificationAnimation />
        </div>
      </Box>
    );
  }

  const NotificationMessage = ({ icon, desc, mins }) => {
    return (
      <Flex
      className="px-[10px] md:px-[16px] mb-2 gap-2"
        p="5"
        alignItems={"center"}
        justifyContent={"space-between"}
        border="1px solid #2D394C33"

      >
        <Flex alignItems={"center"} gap="6">
          {icon}
          <Flex alignItems={"center"} gap="1">
            {/* <Text fontSize={'16'} fontWeight={'medium'} m='0'>{name}</Text> */}
            <Text m="0">{desc}</Text>
          </Flex>
        </Flex>
        <Text m="0">{mins} mins ago</Text>
      </Flex>
    );
  };

  return (
    <div gap={5} className="px-4 md:px-[28px] py-[20px] flex justify-center flex-col" >
      <Text mb="2" fontSize={"20"}>
        Recent
      </Text>
      {currentNotifications.map((msg, index) => (
        <NotificationMessage
          key={index}
          icon={<MdOutlineRestore color="#984779" size={32} />}
          desc={msg.message}
          mins={msg.date}
        />
      ))}

      {/* Pagination controls */}
      <Flex className="justify-between" marginTop="20px">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border rounded-md border-[#2b2a2a]"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastNotification >= message.length}
          className="p-2 border rounded-md border-[#2b2a2a]"

        >
          Next
        </button>
      </Flex>
    </div>
  );
};
