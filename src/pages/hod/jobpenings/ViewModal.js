import React, { useState } from "react";
import { Button ,Text, Flex, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,List,
  ListItem, } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { FiEye } from "react-icons/fi";

const ViewModal = ({ isOpen, onClose, job }) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl" fontWeight="bold" pb={4}>
          {job.title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Description
            </Text>
            <Text>{job.description}</Text>
          </Box>
          <Box mt={4}>
            <Text fontSize="lg" fontWeight="bold">
              Requirements
            </Text>
            <List>
              {job.requirements.map((requirement, index) => (
                <ListItem key={index}>{requirement}</ListItem>
              ))}
            </List>
          </Box>
          <Box mt={4}>
            <Text fontSize="lg" fontWeight="bold">
              Location
            </Text>
            <Text>{job.location}</Text>
          </Box>
          <Box mt={4}>
            <Text fontSize="lg" fontWeight="bold">
              Salary
            </Text>
            <Text>{job.salary}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewModal