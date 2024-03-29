import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Text, useDisclosure, } from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton
} from "@chakra-ui/react";
import { MdModeEditOutline, MdSearch } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { reuseAbleColor } from "../../../components/Color";
import CommonButton from "../../../components/commonbutton/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import DeleteModal from "../../../components/modal/DeleteModal";
import { useSnackbar } from "notistack";
import api from "../../../api";

const CustomSkeletonLoader = ({ count }) => {
  const skeletonRows = Array.from({ length: count }, (_, index) => (
    <tr key={index}>
      <td className='text-center' style={{ height: "65px" }}>
        <Skeleton width="100%" height="50px" />
      </td>
      <td className='fs-6 text-center '>
        <Skeleton width="100%" height="50px" />
      </td>
      <td className='fs-6 text-center '>
        <Skeleton width="100%" height="50px" />
      </td>
      <td className='text-center' style={{ cursor: "pointer", width:'40px' }}>
        <Skeleton width="60%" height="25px"  />
        <Skeleton width="60%" height="25px" marginTop="10px" />
      </td>
    </tr>
  ));

  return skeletonRows;
};


const StaffList = () => {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setselectedUser] = useState(null);
  const [getUsers, setGetUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [paginationMeta, setPaginationMeta] = useState(null);


  useEffect(() => {
    const offset = (currentPage - 1) * perPage;
    api.fetchStaffByDepartment(offset, perPage)
    .then(response => {
      setGetUsers(response.data);
      setPaginationMeta(response.meta);
    })
    .catch(error => {
      enqueueSnackbar("Error fetching data", { variant: "error" });
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [currentPage, perPage]);

  const handleEdit = (id) => {
    navigate(`personal-records/${id}`);
  };

  const handleDeleteClick = (user) => {
    setselectedUser(user);
    onOpen(); 
  };

  const handleDeleteConfirm = () => {
    if (selectedUser) {
      api.deleteUser(selectedUser.id)
        .then(response => {
          const updatedgetUsers = getUsers.filter(user => user.id !== selectedUser.id);
          setGetUsers(updatedgetUsers);

          enqueueSnackbar("Staff deleted successfully", { variant: "success" });
        })
        .catch(error => {
          enqueueSnackbar("Error deleting staff", { variant: "error" });
        });
        onClose();
       setselectedUser(null);
    }
  };

  const handleDeleteCancel = () => {
    onClose(); // Close the modal
   setselectedUser(null);
  };

  return (
    <div>
      {isLoading ? (
        <div className=' shadow mx-3 pb-5 mb-5 mt-5'>
          <p className='fw-semibold ps-4 fs-4 py-4 border-bottom'>Staff List</p>
          <div className='tb-res-parent mt-4'>
            <div className='tb-res'>
              <table className='table table-hover table-bordered'>
                <thead>
                </thead>
                <tbody>
                  <CustomSkeletonLoader count={6} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
      <div>
        <div className=' shadow mx-3 pb-5 mb-5 mt-5'>
          <Box
            display={"flex"}
            alignItems={"center"}
            borderBottom='1px solid #EBEAED'
            px='10'
            justifyContent='space-between'>
            <Text fontSize={"2xl"}>Total Staff : 10</Text>{" "}
            <Link
              to={`add-staff`}>
              <CommonButton title={"Add Staff"} />
            </Link>
          </Box>
          <div className='d-flex justify-content-between'>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className='row mt-1 pa-res px-3'>
            <div
              className='col-lg-3 d-flex gap-3 align-items-center '
              style={{ height: "70px" }}>
              <p className='mt-3 fw-semibold text-muted'>Show results</p>
              <div className=''>
                <select
                  style={{ width: "70px" }}
                  className='form-select rounded-0'
                  aria-label='Default select example'>
                  <option selected>1</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                </select>
              </div>
            </div>
            <div
              className='col-lg-4 d-flex align-items-center'
              style={{ cursor: "pointer", height: "70px" }}>
              <div className='border py-2 px-2'>Copy</div>
              <div className='border py-2 px-2'>Excel</div>
              <div className='border py-2 px-2'>PDF</div>
              <div className='border py-2 px-2'>Print</div>
            </div>
            <div className='col-lg-1'></div>

            <div className='col-lg-4 ' style={{ height: "70px" }}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute" }}>
                  <input
                    type='text'
                    className='form-control mt-2 ps-5'
                    style={{ height: "45px" }}
                    placeholder='Search for staff'
                  />
                </div>
                <div style={{ position: "absolute", top: "18px", left: "10px" }}>
                  <MdSearch size={"25"} />
                </div>
              </div>
            </div>
          </div>
          <div className='tb-res-parent mt-3'>
            <div className='tb-res'>
              <table className='table table-hover table-bordered'>
                <thead>
                  <tr className=''>
                    <th scope='col' style={{ height: "50px" }}>
                      S/N
                    </th>
                    <th scope='col'>Image</th>
                    <th scope='col'>Title</th>
                    <th scope='col'>Full Name</th>
                    <th scope='col'>Email Address</th>
                    <th scope='col'>Role</th>
                    <th scope='col'>Faculty/Department</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Action</th>
                  </tr>
                </thead>
                <tbody>
                {getUsers.map((user, index) => (
                    <tr key={user.id}>
                      <th style={{ height: "65px" }} scope='row'>
                      {index + 1}
                      </th>
                      <td>
                        <img src={user.img} style={{ height: "60px" }} alt='/' />
                      </td>
                      <td className='fs-6'>{user.title}</td>
                      <td className='fs-6'>{user.first_name}  {user.last_name}</td>
                      <td className='fs-6'>{user.email}</td>
                      <td className='fs-6'>{user.role}</td>
                      <td className='fs-6'> {user.faculty ? user.faculty.name : user.department?.name || 'N/A'}</td>
                      <td className='fs-6'>{user.status}</td>
                      <td
                        className=' '
                        align='center'
                        style={{ cursor: "pointer" }}>
                        <IoEyeSharp
                          size={"25"}
                          className='px-1 py-1 text-white rounded-2'
                          style={{ backgroundColor: reuseAbleColor.pupple }}
                          onClick={() => handleEdit(user.id)}
                        />
                      
                        <RiDeleteBinFill
                          size={"25"}
                          className='bg-secondary py-1 px-1 mt-2 text-white rounded-2'
                          onClick={() => handleDeleteClick(user)}
                        />
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal isOpen={isOpen} onClose={handleDeleteCancel}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Confirm Delete</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Are you sure you want to delete this role?
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={handleDeleteConfirm}>
                    Yes
                  </Button>
                  <Button onClick={handleDeleteCancel}>No</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>
        <div className='d-flex justify-content-end py-2 mt-4 px-5'>
          <h1>
          {paginationMeta && (
            <nav aria-label='Page navigation example'>
              <ul class='pagination'>
                <li className={`page-item ${paginationMeta.current_page === 1 ? 'disabled' : ''}`}>
                  <p className='page-link' onClick={() => setCurrentPage(paginationMeta.current_page - 1)} aria-label='Previous'>
                    <span aria-hidden='true'>&laquo;</span>
                  </p>
                </li>
                {/* Render pagination links using meta data */}
                {paginationMeta.links.map(link => (
                  <li key={link.label} className={`page-item ${link.active ? 'active' : ''}`}>
                    <p className='page-link' onClick={() => setCurrentPage(link.label)}>{link.label}</p>
                  </li>
                ))}
                <li className={`page-item ${paginationMeta.current_page === paginationMeta.last_page ? 'disabled' : ''}`}>
                  <p className='page-link' onClick={() => setCurrentPage(paginationMeta.current_page + 1)} aria-label='Next'>
                    <span aria-hidden='true'>&raquo;</span>
                    <span className='sr-only'>Next</span>
                  </p>
                </li>
              </ul>
            </nav>
            )}
          </h1>
        </div>
      </div>
     )}
    </div>
  );
};

export default StaffList;
