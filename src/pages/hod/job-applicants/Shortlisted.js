import React from "react";
import {
  Box,
  Divider,
  Flex,
} from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { BiMessageAltDetail } from "react-icons/bi";

const Shortlisted = (props) => {
  
  return (
    <div className='border-bottom pb-4'>
      <p className='fw-semibold fs-6'>Stage Info</p>
      <div className='row'>
        <div className='col-lg-6'>
          <div>
            <p className='text-muted'>Submission Date</p>
            <p className='fw-semibold' style={{ marginTop: "-15px" }}>
              10 - 13 july 2023
            </p>
          </div>
          <div>
            <p className='text-muted'>Name of Reviewer</p>
            <p className='fw-semibold' style={{ marginTop: "-15px" }}>
              Dr Ajanku
            </p>
          </div>
          <div>
            <button className='my-4 btn btn-outline-dark rounded-0' onClick={props.moveToNextStage}>
              Move To Next Step
            </button>
          </div>
        </div>
        <div className='col-lg-6'>
          <>
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
          </>
        </div>
      </div>
    </div>
  );
};

export default Shortlisted;
