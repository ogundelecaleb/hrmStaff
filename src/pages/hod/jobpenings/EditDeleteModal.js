import React, { useState } from "react";
import { FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";
import { Flex, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { FiEye } from "react-icons/fi";

const EditDeleteModal = ({ isOpen, onClose, job }) => {

  const toast = useToast();

  const [editedJob, setEditedJob] = useState({ ...job });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedJob((prevJob) => ({ ...prevJob, [name]: value }));
  };

  const handleEditSubmit = () => {
    // Implement your logic to update the job details

    toast({
      title: "Job Edited",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  const handleDelete = () => {
    // Implement your logic to delete the job
    toast({
      title: "Job Deleted",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit/Delete Job</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <FormControl mb={4}>
          <FormLabel>Title</FormLabel>
          <Input type="text" name="title" value={editedJob.title} onChange={handleInputChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Description</FormLabel>
          <Input type="text" name="description" value={editedJob.description} onChange={handleInputChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Location</FormLabel>
          <Input type="text" name="location" value={editedJob.location} onChange={handleInputChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Requirements</FormLabel>
          <Input
            type="text"
            name="requirements"
            value={editedJob.requirements.join(", ")}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Salary</FormLabel>
          <Input type="text" name="salary" value={editedJob.salary} onChange={handleInputChange} />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="teal" mr={3} onClick={handleEditSubmit}>
          Save Changes
        </Button>
        <Button colorScheme="red" onClick={handleDelete}>
          Delete Job
        </Button>
      </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditDeleteModal;