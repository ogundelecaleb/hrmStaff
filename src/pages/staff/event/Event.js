import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import React, { useState } from "react";
import dayGridPlugin from '@fullcalendar/daygrid'
import CommonButton from "../../../components/commonbutton/Button";
import 'react-calendar/dist/Calendar.css';

const Event = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [value, onChange] = useState(new Date());

  return (
    <Box style={{ width: "100%" }}>
      <Box >
        <Box display={'flex'} borderBottom='1px solid #EBEAED' justifyContent='flex-end'> <CommonButton action={onOpen} title={'Add Event'} /></Box>

        <Box border='1px solid #EBEAED' m='10'>

          <Box pt='5'>

            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              weekends={false}

              events={[
                { title: 'event 1', date: '2019-04-01' },
                { title: 'event 2', date: '2019-04-02' }
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
                bg={'#984779'}>
                Add Task
              </Button>


            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Box>
  );
};

export default Event;
