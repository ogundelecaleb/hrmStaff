import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Input,
  Textarea,
  Box,
} from "@chakra-ui/react";
import Button2 from "../components/commonbutton/Button";
import { BiPaperclip, BiSend } from "react-icons/bi";
import { reuseAbleColor } from "./Color";
import { FaUnderline } from "react-icons/fa";
import { BsEmojiLaughingFill } from "react-icons/bs";
import { AiFillPicture } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
function InitialFocus({ name, reuseableNavigation }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // const title = "Compose";
  const navigate = useNavigate();
  return (
    <>

      <Button2 title={"Compose"} action={onOpen} />
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", md: "xl", lg: "3xl" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={initialRef}
                placeholder='To : alabidamilola@lasu.com'
              />
            </FormControl>

            <FormControl mt={4}>
              <Input placeholder='Subject : Correction to staff form' />
            </FormControl>
            <FormControl mt={4}>
              <Textarea placeholder='Compose email' height='250px' />
            </FormControl>
          </ModalBody>

          <Box
            px={"6"}
            display={"flex"}
            alignContent={"center"}
            cursor={"pointer"}
            gap={7}>
            <button
              className=' btn d-flex align-items-center gap-2 mb-4 text-white'
              style={{ backgroundColor: reuseAbleColor.pupple }}
              onClick={() => reuseableNavigation("email-message")}>
              Send <BiSend />
            </button>
            <FaUnderline className='text-muted mt-2' size={20} />
            <BiPaperclip className='text-muted mt-2' size={20} />
            <BsEmojiLaughingFill className='text-muted mt-2' size={20} />
            <BiPaperclip className='text-muted mt-2' size={20} />
            {/* <AiOutlinePaperClip className='text-muted mt-2' size={20} /> */}
            <AiFillPicture className='text-muted mt-2' size={20} />
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}
export default InitialFocus;
