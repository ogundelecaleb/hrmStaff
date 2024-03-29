import React, { useState } from "react";
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Text, Button,Flex,Input, IconButton,} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { AiOutlineDown } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaArchive, FaCheck } from "react-icons/fa";

const ImportantMessages = ({ data }) => {
  const navigate = useNavigate();
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCheckboxChange = (item) => {
    const isSelected = selectedMessages.includes(item);
    if (isSelected) {
      setSelectedMessages(selectedMessages.filter((selected) => selected !== item));
    } else {
      setSelectedMessages([...selectedMessages, item]);
    }
  };

  const handleRowClick = (item, event) => {
    const isMessageClicked = event.target.closest(".message-cell");
  
    if (isMessageClicked) {
      setSelectedMessages([item]);
      setIsDrawerOpen(true);
    }
  };

  const handleCloseDrawer = () => {
    setSelectedMessages([]);
    setIsDrawerOpen(false);
  };

  return (
    <div className='container-fluid'>
      <div className='row mt-5'>
        <div className='col-lg-1'></div>
        <div className='col-lg-11 pt-4 shadow rounded mb-5'>
        <Flex
            align="center"
            justify="space-between"
            bg="lightblue"
            p={4}
            mb={4}
            display={selectedMessages.length > 0 ? "flex" : "none"}
          >
            <div>
              <IconButton
                icon={<FaTrash />}
                aria-label="Delete"
                mr={4}
                onClick={() => {
                  // Handle delete action
                }}
              />
              <IconButton
                icon={<FaArchive />}
                aria-label="Archive"
                mr={4}
                onClick={() => {
                  // Handle archive action
                }}
              />
              <IconButton
                icon={<FaCheck />}
                aria-label="Mark as Read"
                onClick={() => {
                  // Handle mark as read action
                }}
              />
            </div>
          </Flex>
          <div className='d-flex flex-wrap align-items-center border-bottom pb-3 justify-content-between px-2'>
            <div className='d-flex align-items-center'>
              <div>
                <p className='fw-semibold fs-5 text-muted'>
                  Showing 1-5 of {data.length}
                </p>
              </div>
            </div>
            <div className=''>
              <input
                type='text'
                className='form-control rounded-4'
                placeholder='Search inbox'
              />
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
          <table className="table">
              <tbody>
                {data.map((item, key) => (
                  <tr
                    key={key}
                    onClick={(event) => handleRowClick(item, event)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: selectedMessages.includes(item) ? "lightblue" : "inherit",
                    }}
                  >
                    <th scope="row ">
                      <input
                        type="checkbox"
                        checked={selectedMessages.includes(item)}
                        onChange={() => handleCheckboxChange(item)}
                      />
                    </th>

                    <td className="pt-3 fw-semibold fs-5 text-muted">
                      <Text noOfLines={1}>{item.name}</Text>
                    </td>
                    <td className="pt-3 fs-5 text-muted message-cell">
                      <Text noOfLines={1}>{item.message}</Text>
                    </td>
                    <td className="pt-3 fw-semibold fs-5 text-muted">
                      {item.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isCentered
        onClose={handleCloseDrawer}
        isOpen={isDrawerOpen}
        motionPreset='slideInBottom'
        size='full'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Inbox</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {selectedMessages && (
              <div className='container px-4'>
              <div className='shadow rounded mt-4 px-5'>
                <div className='py-3'>
                 
                </div>
                <div className='d-flex align-items-center mt-2 gap-3'>
                  <div>
                    <img
                      src='https://bit.ly/prosper-baba'
                      alt='/'
                      height={"80px"}
                      width={"80px"}
                      style={{ borderRadius: "50%" }}
                    />
                  </div>
                  <div>
                    <p className='fw-semibold fs-6 text-muted'>{selectedMessages.name}</p>
                    <p
                      className='d-flex gap-2 align-items-center fs-6 text-muted'
                      style={{ marginTop: "-19px" }}>
                      to me <AiOutlineDown />
                    </p>
                  </div>
                </div>
                <div className='pb-3'>
                  <p className='fw-semibold fs-5 pt-4 mt-2'>Reference Letter needed</p>
                  <p className='fw-semibold fs-6'>
                    {selectedMessages.message}
                    Dear Alabi Damilola <br />I hope this email finds you well. I am
                    writing to request a reference letter from you to support your
                    application for a training leave. As you know, you’ve selected to
                    attend an intensive training program in lagos for three-months to
                    enhance your skills and knowledge in book-keeping . I believe that
                    this training will greatly benefit you in your current role and
                    contribute to the success of your unit. <br /> As part of the
                    training leave application process, You are required to provide a
                    reference letter from a colleague or supervisor who can speak to my
                    work ethic, skills, and potential. Given our past collaborations and
                    your extensive experience in your field, I believe that you would
                    have an excellent candidate to provide this reference. <br /> <br />{" "}
                    Thank you for your time and consideration. Best regards, <br />
                    Head of Department.
                  </p>
                </div>
                
              </div>
            </div>
            )}
          </ModalBody>
          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3} onClick={handleCloseDrawer}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className='d-flex justify-content-end py-4 px-5'>
        <h1>
          <nav aria-label='Page navigation example'>
            <ul class='pagination'>
              <li class='page-item'>
                <p class='page-link' aria-label='Previous'>
                  <span aria-hidden='true'>&laquo;</span>
                  <span class='sr-only'>Previous</span>
                </p>
              </li>
              <li class='page-item'>
                <p class='page-link' href='#'>
                  1
                </p>
              </li>
              <li class='page-item'>
                <p class='page-link' aria-label='Next'>
                  <span aria-hidden='true'>&raquo;</span>
                  <span class='sr-only'>Next</span>
                </p>
              </li>
            </ul>
          </nav>
        </h1>
      </div>
      
    </div>
  );
};

export default ImportantMessages;
