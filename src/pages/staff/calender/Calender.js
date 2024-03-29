import { Box, Button, Divider, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai"
import { BiListUl } from "react-icons/bi"
import { CgMenuGridO } from "react-icons/cg"
import 'react-calendar/dist/Calendar.css';
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from "@fullcalendar/react";
import { useState } from "react"; // Import useState hook

const Calender = () => {

  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventNote, setEventNote] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleAddEvent = () => {
    // Create a new event object and add it to the events array
    const newEvent = {
      title: eventTitle,
      date: eventDate + "T" + eventTime,
      description: eventNote,
      // Add more properties as needed (e.g., color, description)
    };

    setEvents([...events, newEvent]);

    // Clear the input fields and close the modal
    setEventTitle("");
    setEventDate("");
    setEventTime("");
    setEventNote("");
    onClose();
  };


  return (
    <Box style={{ width: "100%" }}>
      <Box mt='5' mx='10'>

        <Box display='flex' justifyContent={'flex-end'}>
          <Button borderRadius={'0'} borderStartStartRadius={'lg'} borderEndStartRadius={'lg'}> <CgMenuGridO /></Button>
          <Button borderRadius={'0'} borderEndEndRadius={'lg'} borderStartEndRadius={'lg'} color='#984779'><BiListUl size='20' /></Button>
          <Button ml='2'
            onClick={onOpen}
            className='btn py-2 px-4 me-2  text-white rounded-0'
            leftIcon={<AiOutlinePlus color='white' />} bg='#984779' borderRadius={'sm'}>

            Add Task</Button>

        </Box>
      </Box>
      <Divider />

      <Box mx='10'>

        <Box border='1px solid #EBEAED' >

          <Box pt='5'>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              weekends={false}

              events={[
                { title: 'Exam', date: '2023-09-06' },
                { title: 'Exam', date: '2023-09-07' }
              ]}
            />

          </Box>
        </Box>
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody >
            <Box my='20'>
              <Input placeholder="Date" type={'date'} />
              <Input my='5' placeholder="Time" type={'time'} />
              <Textarea placeholder="Note" />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Box display={'flex'} justifyContent='left' mr='10' my='5'>


              <Button
                className='btn py-2 px-4 me-2  text-white rounded-0'
                bg={'#984779'}  onClick={handleAddEvent}>    
                Add Task
              </Button>


            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
};
export default Calender;
