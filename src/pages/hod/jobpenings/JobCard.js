import React, { useState } from "react";
import { Button, Flex, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import EditDeleteModal from "./EditDeleteModal";
import ViewModal from "./ViewModal";

const JobCard = ({ job }) => {
  const [editDeleteModalOpen, setEditDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const openEditDeleteModal = () => setEditDeleteModalOpen(true);
  const closeEditDeleteModal = () => setEditDeleteModalOpen(false);

  const openViewModal = () => setViewModalOpen(true);
  const closeViewModal = () => setViewModalOpen(false);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{job.title}</h5>
        <p className="card-text">{job.description}</p>
        <Flex row justifyContent={'space-between'}>
          <Button backgroundColor={'#17082d'} colorScheme="teal" leftIcon={<CiEdit />} onClick={openEditDeleteModal} variant='solid'>
            Edit/Delete
          </Button>
          <Button backgroundColor={'#17082d'} colorScheme="teal" rightIcon={<FiEye />} onClick={openViewModal}>
            View
          </Button>
        </Flex>

        <EditDeleteModal isOpen={editDeleteModalOpen} onClose={closeEditDeleteModal} job={job} />
        <ViewModal isOpen={viewModalOpen} onClose={closeViewModal} job={job} />
      </div>
    </div>
  );
};

export default JobCard;