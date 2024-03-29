import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const EmailMessage = () => {
  const navigate = useNavigate();
  return (
    <div className='container px-4'>
      <div className='shadow rounded mt-4 px-5'>
        <div className='py-3' onClick={() => navigate(-1)}>
          <BsArrowLeftShort size={"40"} />
        </div>
        <div className='d-flex align-items-center mt-2 gap-3'>
          <div>
            <img
              src='https://bit.ly/prosper-baba'
              alt='/'
              height={"80px"}
              width={"80px"}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div>
            <p className='fw-semibold fs-6 text-muted'>Daramola James</p>
            <p
              className='d-flex gap-2 align-items-center fs-6 text-muted'
              style={{ marginTop: "-19px" }}>
              to me <AiOutlineDown />
            </p>
          </div>
        </div>
        <div className='pb-3'>
          <p className='fw-semibold fs-5 pt-4 mt-2'>Reference Letter needed</p>
          <p className='fw-semibold fs-6'>
            Dear Alabi Damilola <br />I hope this email finds you well. I am
            writing to request a reference letter from you to support your
            application for a training leave. As you know, you’ve selected to
            attend an intensive training program in lagos for three-months to
            enhance your skills and knowledge in book-keeping . I believe that
            this training will greatly benefit you in your current role and
            contribute to the success of your unit. <br /> As part of the
            training leave application process, You are required to provide a
            reference letter from a colleague or supervisor who can speak to my
            work ethic, skills, and potential. Given our past collaborations and
            your extensive experience in your field, I believe that you would
            have an excellent candidate to provide this reference. <br /> <br />{" "}
            Thank you for your time and consideration. Best regards, <br />
            Head of Department.
          </p>
        </div>
        <div className='py-4 d-flex justify-content-end mt-3'>
          <nav aria-label='Page navigation example'>
            <ul class='pagination'>
              <li class='page-item'>
                <p class='page-link' aria-label='Previous'>
                  <span aria-hidden='true'>&laquo;</span>
                  <span class='sr-only'>Previous</span>
                </p>
              </li>
              <li class='page-item'>
                <p class='page-link' href='#'>
                  1
                </p>
              </li>
              <li class='page-item'>
                <p class='page-link' href='#'>
                  2
                </p>
              </li>
              <li class='page-item'>
                <p class='page-link' href='#'>
                  3
                </p>
              </li>
              <li class='page-item'>
                <p class='page-link' aria-label='Next'>
                  <span aria-hidden='true'>&raquo;</span>
                  <span class='sr-only'>Next</span>
                </p>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default EmailMessage;
