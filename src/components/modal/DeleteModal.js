import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import { RiDeleteBinFill } from "react-icons/ri";

function DeleteModal() {
  const { isOpen, onOpen, onClose, onDelete } = useDisclosure()

  return (
    <>

      <RiDeleteBinFill
        onClick={onOpen}
        size={"25"}
        className='bg-secondary py-1 px-1 mt-2 text-white rounded-2'
      />
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent py='10'>
          
          <ModalBody pb={6} px='10'>
            <Text textAlign={'center'}>Are you sure you want to permanently delete this information?</Text>
          </ModalBody>

          <ModalFooter justifyContent={'center'} gap='5'>
            <Button bg='#984779' color='white' borderRadius={0} mr={3} onClick={onDelete}>
              Confirm
            </Button>
            <Button border='1px solid #984779' bg='white' borderRadius={0} color={'#984779'} onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default DeleteModal;