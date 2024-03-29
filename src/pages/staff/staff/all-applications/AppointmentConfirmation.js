import React, { useState, useEffect, useCallback } from "react";
import { TbDirection, TbGridDots } from "react-icons/tb";
import { MdSearch } from "react-icons/md";
import { useSnackbar } from "notistack";
import api from "../../../../api";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
} from "@chakra-ui/react";
import { MoonLoader } from "react-spinners";
import NoData from "../../../../components/NoData"

const AppointmentConfirmation = () => {

  const [page, setPage] = useState(1);


  async function getConfirmation(page) {
    const response = await api.fetchMyConfrimationRequest({ params: { page } })
    return response;
  }

  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(['confirmationRequests', page], () =>
    getConfirmation(page),
    {
      keepPreviousData: true, refetchOnWindowFocus: "always",
    }

  );
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  if (isLoading) {
    return (
        <Box
        w={"80vw"}
        display="flex"
        flexDirection="column"
        h={"80vh"}
        alignItems="center"
        justifyContent="center"
        >
        <div
            className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70"
            style={{ zIndex: 9999 }}
        >
            <div className="inline-block">
            <MoonLoader color={"#984779"} size={80} />
            </div>
        </div>
        </Box>
    );
  }

  return (  
  
    <div className='container px-4 border-top'>
      <div className='px-3 tb-res-parent mt-4  '>
        <div className='tb-res'>
          <table class='table table-hover'>
            <thead>
              <tr className='border'>
                <th scope='col' className='py-3'>
                  <input type='checkbox' className='border' />
                </th>
                <th scope='col' className='fw-light py-3 text-muted fs-6'>
                  Applicant Name{" "}
                  <label style={{ marginBottom: "-8px" }}>
                    <TbDirection size={"25"} />
                  </label>
                </th>
                <th scope='col' className='fw-light py-3 text-muted fs-6'>
                  Stage{" "}
                  <label style={{ marginBottom: "-8px" }}>
                    <TbDirection size={"25"} />
                  </label>
                </th>
                <th scope='col' className='fw-light py-3 text-muted fs-6'>
                  Applied Date{" "}
                  <label style={{ marginBottom: "-8px" }}>
                    <TbDirection size={"25"} />
                  </label>
                </th>
                <th scope='col' className='fw-light py-3 text-muted fs-6'>
                  Department{" "}
                  <label style={{ marginBottom: "-8px" }}>
                    <TbDirection size={"25"} />
                  </label>
                </th>
                <th scope='col' className='fw-light py-3 text-muted fs-6'>
                  Action{" "}
                  <label style={{ marginBottom: "-8px" }}>
                    <TbDirection size={"25"} />
                  </label>
                </th>
              </tr>
            </thead>
            <br />
            {data?.data?.map((item) => (
              <tbody key={item.id} className='border'>
                <tr>
                  <th scope='row'>
                    <input type='checkbox' className='mt-4' />
                  </th>
                  <td>
                    <div className='d-flex gap-4'>
                       <img
                        src={item.user_image}
                        style={{
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                        }}
                        className='mt-2'
                        alt='/'
                      />
                      <div style={{ lineHeight: "5px" }}>
                        <p className='fw-semibold mt-3'>{item.full_name}</p>
                        <p className='fw-lighter text-muted'>{item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button className='btn fw-semibold btn-outline-primary mt-3 btn-sm rounded-5'>
                    {item.stage}
                    </button>
                  </td>
                  <td className='fw-semibold'>
                  <p className='mt-3'>{formatDate(item.date)}</p>
                  </td>
                  <td className='fw-semibold pt-4'>{item.department?.name || item.faculty?.name || item.unit?.name}</td>
                  <td className='fw-semibold'>
                    <Link
                      to={`confirmation-details/${item.id}`}
                      state={{ item: item }}>
                      <button
                        className='btn py-1 px-3 rounded-0 mt-3 btn-sm rounded-0 fw-semibold'
                        style={{
                          border: "1px solid #984779",
                          color: "#987779",
                          backgroundColor: "#E9EBFD",
                        }}>
                        View Application
                      </button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      {data && data.data && data?.data?.length === 0 && ( 
        <Box
          w={"80vw"}
          display="flex"
          flexDirection="column"
          h={"20vh"}
          alignItems="center"
          justifyContent="center"
        >
          <div className='row mt-5 ' style={{ height: "10px", width:"80%"}}>
            <NoData/>
          </div>
  
        </Box>
      )}
      {data && data.data && data?.data?.length > 0 && (
          <div className='row px-4'>
            <div className='col-lg-4 d-flex gap-3 align-items-center '>
              <div className="mt-4 flex justify-center text-gray-500 text-sm">
                <span className="mr-2">
                  Showing {data?.meta?.from} - {data.meta?.to}{" "}
                  of {data?.meta?.total} results
                </span>
                <span className="mr-2">|</span>
                <span className="mr-2">
                  Page {data?.meta?.current_page} of {data?.meta?.last_page}
                </span>
                <span className="mr-2">|</span>
                {/* <span className="mr-2">Page Size: {data?.meta?.per_page}</span> */}
              </div>
            </div>
            <div className='col-lg-4 '></div>
            <div className='col-lg-4'>
              <div className='d-flex justify-content-end py-2 mt-4 px-5'>
                <h1>
                 
                    <nav aria-label='Page navigation example'>
                      <ul class='pagination'>
                        <li className={`page-item ${data?.meta?.current_page === 1 ? 'disabled' : ''}`}>
                          <p className='page-link'  onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={data.links.prev === null || data?.meta?.current_page === 1 || isPreviousData}>
                            <span aria-hidden='true'>Prev</span>
                          </p>
                        </li>

                        

                        <li className={`page-item ${data?.meta?.current_page === data?.meta?.last_page ? 'disabled' : ''}`}>
                          <p className='page-link' onClick={() => setPage(prev => prev + 1)}
                    disabled={data.links.next === null || data?.meta?.current_page === data?.meta?.last_page || isPreviousData}>
                            <span aria-hidden='true'>Next</span>
                          </p>
                        </li>
                      </ul>
                    </nav>
                 
                </h1>
              </div>
            </div>
          </div>
          )}
    </div>
  );
};

export default AppointmentConfirmation;
