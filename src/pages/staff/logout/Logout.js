import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import api from "../../../api";
import { Link, useMatch, useLocation, useNavigate, useResolvedPath } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { TbLogout2 } from "react-icons/tb";

function LogoutModal() {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    return (
        <>

            <CustomLink click={onOpen}>

                <div
                    id='hoverEffect'
                    className='ps-3 ms-1 d-flex align-items-center rounded gap-2'
                    style={{ height: "48px", width: "100%", backgroundColor:'#17082d',}}>
                    <TbLogout2 size='25' style={{ color: "#84818A"}} />
                    Logout
                </div>
            </CustomLink>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Log out ?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Are you sure to logout?</ModalBody>

                    <ModalFooter gap='5'>
                        <Link to='/' >
                            <Button  px={10} colorScheme='blue' onClick={() => {
                                onClose();
                                api.logout();
                                navigate("/login");}}>
                                Yes
                            </Button>
                        </Link>
                        <Button onClick={onClose} variant='ghost' width={"100px"}>
                            {loading ? <Spinner /> : "No"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
function CustomLink({ to, children, click, ...props }) {
    const resolvedpath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedpath.pathname, end: true });
    return (
        <div id={isActive ? "active" : ""}>
            <div className={isActive ? "ss bg-white" : "d-none"}></div>
            <Link to={to} {...props} onClick={click}>
                {children}
            </Link>
        </div>
    );
}

export default LogoutModal;
