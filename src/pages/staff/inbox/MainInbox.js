import React from "react";
import { Route, Routes } from "react-router-dom";
import Inbox from "./Inbox";
import EmailMessage from "./EmailMessage";

const MainInbox = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Inbox />} />
        <Route path='/email-message' element={<EmailMessage />} />
      </Routes>
    </div>
  );
};

export default MainInbox;
