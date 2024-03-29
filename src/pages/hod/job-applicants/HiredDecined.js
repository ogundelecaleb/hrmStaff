import React, { useState } from "react";
import {
  Box,
  Divider,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { BiMessageAltDetail } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { reuseAbleColor } from "../../../components/Color";

const HiredDecined = () => {

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isHired, setIsHired] = useState(false);

  const onCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const onHireApplicant = () => {
    setIsAlertOpen(true);
  };

  const onConfirmHire = () => {
    
    setIsHired(true);
    setIsAlertOpen(false);
  };

  return (
    <div className='mt-4 border-bottom pb-4'>
      <div className='d-flex  justify-content-between'>
        <p className='fw-semibold fs-6'>Comment</p>
        <div className='d-flex gap-2' style={{ color: reuseAbleColor.pupple }}>
          <AiOutlinePlus size={"20"} className='mt-1' />
          
        </div>
      </div>
      <div className='row' >
        <div className='col-lg-6'>
          <div className='border px-3 pt-3'>
            <div className='d-flex  justify-content-between'>
              <p className='fw-semibold fs-6'>Departmental Admin</p>
              <p>10 july, 2021 11:30 AM</p>
            </div>
            <p style={{ marginTop: "-13px" }}>
              Applicant was successfully interviewed and met up to all requirements
            </p>
          </div>
        </div>
        <div className='col-lg-6'>
          <Box>
            <Input
              h='16'
              borderRadius={"0"}
              border='1px solid #2D394C1A'
              placeholder='Add a comment...'
              
            />
            <Flex pt='5' gap='4'>
              <Button
                h='12'
                w='full'
                borderRadius={"0"}
                border='1px solid #2D394C1A'
                bg='white'
                color='#4640DE'
                >
                Comment
              </Button>
              <Button
                h='12'
                w='16'
                borderRadius={"0"}
                border='1px solid #2D394C1A'
                bg='white'
                color='#4640DE'>
                <BiMessageAltDetail />
              </Button>
            </Flex>    
          </Box>
          <Divider />
        </div>
      </div>
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={undefined}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Hire Applicant
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to hire the applicant?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onCloseAlert}>Cancel</Button>
              <Button colorScheme="green" onClick={onConfirmHire} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {isHired && (
        <div className="d-flex mt-4 py-3 justify-content-center">
          <button className="btn btn-success rounded-0">APPLICANT HIRED</button>
        </div>
      )}
      {!isHired && (
      <div className='d-flex mt-4 py-3 justify-content-around'>
        <div>
          <button className='text-danger rounded-0 btn border w-full'>Decline</button>
        </div>
        <div>
          <button className='btn btn-success rounded-0' onClick={onHireApplicant}>Hire Applicant</button>
        </div>
      </div>
      )}
    </div>
  );
};

export default HiredDecined;
