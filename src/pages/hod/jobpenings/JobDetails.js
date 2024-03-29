import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Button, Text, VStack,useDisclosure } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const JobDetails = ({ navigate }) => {
  const location = useLocation();
  const {jobData} = location.state;
  const [resume, setResume] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

 
  return (
    <Box>
      <VStack align="start" spacing="4">
        <Box>
          <Heading>{jobData.title}</Heading>
          <Button colorScheme="teal" mt="2" onClick={onOpen}>
            Apply for Job
          </Button>
        </Box>
        <Box>
          <Heading as="h2" size="md" mb="2">
            Job Description
          </Heading>
          <Text>{jobData.description}</Text>
          <Heading as="h2" size="md" mt="4" mb="2">
            Key Responsibilities
          </Heading>
          <Text>{jobData.responsibilities}</Text>
        </Box>
        <Box>
          <Heading as="h2" size="md">
            Sidebar
          </Heading>
          <Text>Date Posted: {new Date().toLocaleDateString()}</Text>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Apply for {jobData.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Your Resume</FormLabel>
                <Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResume(e.target.files[0])} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} >
                Submit Application
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default JobDetails;
