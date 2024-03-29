import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useState , useEffect} from "react";
import { HiUpload } from 'react-icons/hi'
import { MdOutlineRestore } from 'react-icons/md'
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
      setMessage(message.data)
    } catch (error) {
      console.error("Error fetching notifications", error);
      enqueueSnackbar(error.message, { variant: 'error' })
    }finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    fetchUserNotification();
  }, []);

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = message.slice(indexOfFirstNotification, indexOfLastNotification);

  const paginate = pageNumber => {
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
        <div className='row mt-5 ' style={{ height: "10px", width:"80%"}}>
          <NotificationAnimation/>
        </div>

      </Box>
    );
  }

  const NotificationMessage = ({ icon, desc, mins }) => {
    return (
      <Flex  px='10' p='5' alignItems={'center'} justifyContent={'space-between'} border='1px solid #2D394C33'>
        <Flex alignItems={'center'} gap='10'>
          {icon}
          <Flex alignItems={'center'} gap='1'>
          {/* <Text fontSize={'16'} fontWeight={'medium'} m='0'>{name}</Text> */}
          <Text m='0'>{desc}</Text>
          </Flex>
        </Flex>
        <Text m='0'>{mins} mins ago</Text>
      </Flex>
    )
  }

  return (
    <Flex gap={5} flexDirection={'column'} p='20'>
      <Text m='0' fontSize={'20'}>Recent</Text>
      {currentNotifications.map((msg, index) => (
        <NotificationMessage
          key={index}
          icon={<MdOutlineRestore color='#984779' size={32}/>}
          desc={msg.message}
          mins={msg.date}
        />
      ))}


      {/* Pagination controls */}
      <Flex justifyContent="center" marginTop="20px">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastNotification >= message.length}>
          Next
        </button>
      </Flex>
    </Flex>
  )
}
