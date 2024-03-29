import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  FormControl,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { reuseAbleColor } from "./Color";
import { AiOutlinePlus } from "react-icons/ai";

function LeaveModal({ name }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button
        onClick={onOpen}
        color={"white"}
        rounded={0}
        bg={reuseAbleColor.pupple}>
        {name}
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        size={{ base: "full", md: "xl", lg: "4xl" }}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pt={10} pb={6}>
            <FormControl>
              <Textarea placeholder='Add Leave Type' height='100px' />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"start"}>
            <Button bg={reuseAbleColor.pupple} color={"white"} mr={3}>
              <AiOutlinePlus style={{ marginRight: "10px" }} /> Save
            </Button>
            <Button
              bg={"transparent"}
              color={reuseAbleColor.pupple}
              border={`1px solid ${reuseAbleColor.pupple}`}
              onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default LeaveModal;
