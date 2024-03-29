import { useState } from "react";
import InitialFocus from "../../../components/ComposeMessage";
import InboxMesaage from "./InboxMesaage";
import ImportantMessages from "./ImportantMessages";
import DraftMessage from "./DraftMessage";
import SentMessages from "./SentMessages";
const Inbox = ({ reuseableNavigation }) => {
  const [page, setPage] = useState("Inbox");
  const [toggle, setToggle] = useState(false);
  const navigate = (page) => {
    setPage(page);
  };
  const data = [
    {
      id: 1,
      img: "https://bit.ly/prosper-baba",
      name: "Daramola James",
      message: "Dear Alabi Damilola I hope this email finds you well. I am writing to request a reference letter from you to support your application for a training leave As you know you’ve selected to attend an intensive training program in lagos for three-months to enhance your skills and knowledge in book-keeping I believe that	this training will greatly benefit you in your current role and	contribute to the success of your unit As part of the training leave application process, You are required to provide a	reference letter from a colleague or supervisor who can speak to my	work ethic, skills, and potential. Given our past collaborations and your extensive experience in your field, I believe that you would have an excellent candidate to provide this reference. Thank you for your time and consideration. Best regards, Head of Department",
      time: "1hr",
    },
    {
      id: 2,
      img: "https://bit.ly/prosper-baba",
      name: "Daramola James",
      message: "Dear Alabi Damilola I hope this email finds you well. I am writing to request a reference letter from you to support your application for a training leave As you know you’ve selected to attend an intensive training program in lagos for three-months to enhance your skills and knowledge in book-keeping I believe that	this training will greatly benefit you in your current role and	contribute to the success of your unit As part of the training leave application process, You are required to provide a	reference letter from a colleague or supervisor who can speak to my	work ethic, skills, and potential. Given our past collaborations and your extensive experience in your field, I believe that you would have an excellent candidate to provide this reference. Thank you for your time and consideration. Best regards, Head of Department",
      time: "1hr",
    },
    {
      id: 3,
      img: "https://bit.ly/prosper-baba",
      name: "Daramola James",
      message: "Dear Alabi Damilola I hope this email finds you well. I am writing to request a reference letter from you to support your application for a training leave As you know you’ve selected to attend an intensive training program in lagos for three-months to enhance your skills and knowledge in book-keeping I believe that	this training will greatly benefit you in your current role and	contribute to the success of your unit As part of the training leave application process, You are required to provide a	reference letter from a colleague or supervisor who can speak to my	work ethic, skills, and potential. Given our past collaborations and your extensive experience in your field, I believe that you would have an excellent candidate to provide this reference. Thank you for your time and consideration. Best regards, Head of Department",
      time: "1hr",
    },
    {
      id: 4,
      img: "https://bit.ly/prosper-baba",
      name: "Daramola James",
      message: "Dear Alabi Damilola I hope this email finds you well. I am writing to request a reference letter from you to support your application for a training leave As you know you’ve selected to attend an intensive training program in lagos for three-months to enhance your skills and knowledge in book-keeping I believe that	this training will greatly benefit you in your current role and	contribute to the success of your unit As part of the training leave application process, You are required to provide a	reference letter from a colleague or supervisor who can speak to my	work ethic, skills, and potential. Given our past collaborations and your extensive experience in your field, I believe that you would have an excellent candidate to provide this reference. Thank you for your time and consideration. Best regards, Head of Department",
      time: "1hr",
    },
    {
      id: 5,
      img: "https://bit.ly/prosper-baba",
      name: "Daramola James",
      message: "Dear Alabi Damilola I hope this email finds you well. I am writing to request a reference letter from you to support your application for a training leave As you know you’ve selected to attend an intensive training program in lagos for three-months to enhance your skills and knowledge in book-keeping I believe that	this training will greatly benefit you in your current role and	contribute to the success of your unit As part of the training leave application process, You are required to provide a	reference letter from a colleague or supervisor who can speak to my	work ethic, skills, and potential. Given our past collaborations and your extensive experience in your field, I believe that you would have an excellent candidate to provide this reference. Thank you for your time and consideration. Best regards, Head of Department",
      time: "1hr",
    },
    
  ];
  const reuseAbleBoxChildren = (
    bgColor,
    textColor,
    text,
    number,
    status,
    route
  ) => {
    return (
      <div
        onClick={() => navigate(text)}
        style={{ cursor: "pointer" }}
        className={`px-2 d-flex justify-content-between`}>
        <p className={`fw-${text === page ? "bold" : ""} fs-5`}>{text}</p>
        <p
          className='rounded-3 fs-6 px-2 fw-semibold py-1'
          style={{ backgroundColor: bgColor, color: textColor }}>
          {number}
        </p>
      </div>
    );
  };
  return (
    <div className='container-fluid'>
      <div className='row border-bottom'>
        <InitialFocus />
      </div>
      <div className='row px-5 mt-4' id='no-padding-res'>
        <div onClick={() => setToggle(!toggle)} className='toggleBtn'>
          <i className='fa fa-bars'></i>
        </div>
        <div
          onClick={() => setToggle(false)}
          id={toggle ? "on" : "off"}
          className='pt-4 col-md-3 shadow rounded-3 p-2'
          style={{ height: "240px" }}>
          {reuseAbleBoxChildren("#B9B5C0", "dark", "Inbox", 20, true)}
          {reuseAbleBoxChildren("#CAA1BB", "#B1749A", "Sent", 20)}
          {reuseAbleBoxChildren("#BAE69F", "#86D357", "Important", 5)}
          {reuseAbleBoxChildren("#FFB3B3", "#FF5959", "Draft", 99)}
        </div>
        <div className='col-md-9'>
          {page === "Inbox" && <InboxMesaage data={data} />}
          {page === "Sent" && <SentMessages data={data} />}
          {page === "Draft" && <DraftMessage data={data} />}
          {page === "Important" && <ImportantMessages data={data} />}
        </div>
      </div>
    </div>
  );
};
export default Inbox;
