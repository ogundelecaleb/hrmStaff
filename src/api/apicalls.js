import {
  GETUSERS,
  DELETEUSER,
  GETROLE,
  ADDUSER,
  DISPLAYALLDEPARTMENT,
  DISPLAYALLFACULTY,
  ADDNEWSTAFF,
  UPDATEPINFO,
  UPDATENOK,
  UPDATECINFO,
  UPDATEFINFO,
  UPDATEAINFO,
  UPDATEPASSWORD,
  GETSTAFFBYID,
  APPLYLEAVE,
  DISPLAYDEPARTMENTLEAVE,
  CSLEAVE,
  DISPLAYSTAFFBYDEPARTMENT,
  GETLEAVEBYID,
  APPROVELEAVE,
  MYLEAVE,
  RESETPASSWORD,
  VERIFYOTP,
  CHANGEPASSWORD,
  PTLEAVE,
  DISPLAYALLUNIT,
  UNITLEAVE,
  DEANLEAVE,
  NOTIFICATION,
  DEPUTYPROVOSTLEAVE,
  HNASESLEAVE,
  HNASEJLEAVE,
  ADDNEWAPPLICANT,
  APPOINTMENTAPPLICATION,
  LEAVERESUMPTION,
  REGULARIZATIONAPPLICATION,
  APPOINTMENTCONFIRMATION,
  APPOINTMENTWITHDRAWAL,
  MYCONFIRMATION,
  LEAVERESUMPTIONREQUEST,
  MYCONFIRMATIONBYID,
  RESUMPTIONBYID,
  MYREGULARIZATION,
  REGULARIZATIONBYID,
  MYASSUMPTION,
  ASSUMPTIONBYID,
  MYWITHDRAWAL,
  WITHDRAWALBYID,
  SPADEVAPPLICATION,
  MYSPADEV,
  SPADEVBYID,
  CSASSUMPTION,
  DEANASSUMPTION,
  HOUASSUMPTION,
  PROVOSTASSUMPTION,
  HNASEJASSUMPTION,
  HNASESASSUMPTION,
  CSREGULARIZED,
  HODASSUMPTION,
  HODREGULARIZED,
  HOUREGULARIZED,
  PROVOSTREGULARIZED,
  DEANREGULARIZED,
  HNASEJREGULARIZED,
  HNASESREGULARIZED,
  APPROVEASSUMPTION,
  APPROVEREGULARIZED,
  CSCONFIRMATION,
  HODCONFIRMATION,
  DEANCONFIRMATION,
  HOUCONFIRMATION,
  PROVOSTCONFIRMATION,
  HNASEJCONFIRMATION,
  HNASESCONFIRMATION,
  APPROVECONFIRMATION,
  CSWITHDRAWAL,
  HODWITHDRAWAL,
  HOUWITHDRAWAL,
  PROVOSTWITHDRAWAL,
  DEANWITHDRAWAL,
  HNASEJRWITHDRAWAL,
  HNASESWITHDRAWAL,
  APPROVEWITHDRAWAL,
  CSSPADEV,
  HODSPADEV,
  HOUSPADEV,
  PROVOSTSPADEV,
  DEANSPADEV,
  HNASEJSPADEV,
  HNASESSPADEV,
  APPROVESPADEV,
  CREATEJOB,
  FETCHJOBS,
} from "../utils/config";
import { apiGet, apiPost, apiPut, apiDelete } from "../utils/utils";

// USERS

export function fetchRole(data) {
  return apiGet(GETROLE, data);
}

export function addUser(data) {
  return apiPost(ADDUSER, data);
}

export function registerStaff(data) {
  return apiPost(ADDNEWSTAFF, data);
}

export function fetchUsers(data) {
  return apiGet(GETUSERS, data);
}

export function deleteUser(data) {
  return apiDelete(DELETEUSER + data);
}

export function fetchFaculties(data) {
  return apiGet(DISPLAYALLFACULTY, data);
}

export function fethDeparments(data) {
  return apiGet(DISPLAYALLDEPARTMENT, data);
}

export function fethUnit(data) {
  return apiGet(DISPLAYALLUNIT, data);
}

export function fethDepartmentLeave(data) {
  return apiGet(DISPLAYDEPARTMENTLEAVE, data);
}

export function fethUnitLeave(data) {
  return apiGet(UNITLEAVE, data);
}

export function fetchStaffByDepartment(data) {
  return apiGet(DISPLAYSTAFFBYDEPARTMENT, data);
}

export function fetchNotification(data) {
  return apiGet(NOTIFICATION, data);
}

export function updatePinfo(data) {
  return apiPost(UPDATEPINFO, data, { 'Content-Type': 'multipart/form-data' });
}

export function requestLeave(data) {
  return apiPost(APPLYLEAVE, data, { 'Content-Type': 'multipart/form-data' });
}

export function updateCinfo(data) {
  return apiPost(UPDATECINFO, data);
}

export function updateNok(data) {
  return apiPost(UPDATENOK, data);
}

export function updateFinfo(data) {
  return apiPost(UPDATEFINFO, data);
}

export function updateAinfo(data) {
  return apiPost(UPDATEAINFO, data, { 'Content-Type': 'multipart/form-data' });
}

export function updatePassword(data) {
  return apiPost(UPDATEPASSWORD, data);
}

export function resetPassword(data) {
  return apiPost(RESETPASSWORD, data);
}

export function veriyOtp(data) {
  return apiPost(VERIFYOTP, data);
}

export function changePassword(data) {
  return apiPost(CHANGEPASSWORD, data);
}

export function getStaffbyID(data) {
  return apiGet(GETSTAFFBYID + data);
}

export function getLeavebyID(data) {
  return apiGet(GETLEAVEBYID + data);
}
export function fetchCsLeaves(data) {
  return apiGet(CSLEAVE, data);
}

export function fetchPtLeaves(data) {
  return apiGet(PTLEAVE, data);
}

export function fetchDnLeaves(data) {
  return apiGet(DEANLEAVE, data);
}

export function fetchDptLeaves(data) {
  return apiGet(DEPUTYPROVOSTLEAVE, data);
}

export function fetchHnasesLeaves(data) {
  return apiGet(HNASESLEAVE, data);
}

export function fetchHnasejLeaves(data) {
  return apiGet(HNASEJLEAVE, data);
}
export function fetchMyLeaves(data) {
  return apiGet(MYLEAVE, data);
}

export function handleApprove(data) {
  return apiPost(APPROVELEAVE + data.id, data);
}

export function handleDecline(data) {
  return apiPost(APPROVELEAVE + data.id, data);
}

export function registerNewStaff(data) {
  return apiPost(ADDNEWAPPLICANT, data);
}

export function registerNewAppointment(data) {
  return apiPost(APPOINTMENTAPPLICATION, data);
}

export function leaveResumption(data) {
  return apiPost(LEAVERESUMPTION, data, { 'Content-Type': 'multipart/form-data' });
}

export function createNewRegularization(data) {
  return apiPost(REGULARIZATIONAPPLICATION, data);
}

export function createNewCONFIRMATION(data) {
  return apiPost(APPOINTMENTCONFIRMATION, data);
}

export function appointmentWithdrawal(data) {
  return apiPost(APPOINTMENTWITHDRAWAL, data);
}

export function fetchMyConfrimationRequest(data) {
  return apiGet(MYCONFIRMATION, data);
}

export function getConfirmationbyID(data) {
  return apiGet(MYCONFIRMATIONBYID + data);
}


export function fetchLeaveResumptionRequest(data) {
  return apiGet(LEAVERESUMPTIONREQUEST, data);
}

export function getLeaveResumptionbyID(data) {
  return apiGet(RESUMPTIONBYID + data);
}

export function fetchRegularizationRequest(data) {
  return apiGet(MYREGULARIZATION, data);
}

export function getRegularizationbyID(data) {
  return apiGet(REGULARIZATIONBYID + data);
}

export function fetchAssumptionRequest(data) {
  return apiGet(MYASSUMPTION, data);
}

export function getAssumptionbyID(data) {
  return apiGet(ASSUMPTIONBYID + data);
}

export function fetchWithdrawalRequest(data) {
  return apiGet(MYWITHDRAWAL, data);
}

export function getWithdrawalbyID(data) {
  return apiGet(WITHDRAWALBYID + data);
}

export function createSpadev(data) {
  return apiPost(SPADEVAPPLICATION, data);
}

export function fetchSpadevRequest(data) {
  return apiGet(MYSPADEV, data);
}

export function getSpadevbyID(data) {
  return apiGet(SPADEVBYID + data);
}



export function fetchCSAssumptionRequest(data) {
  return apiGet(CSASSUMPTION, data);
}

export function fetchHodAssumptionRequest(data) {
  return apiGet(HODASSUMPTION, data);
}

export function fetchUnitAssumptionRequest(data) {
  return apiGet(HOUASSUMPTION, data);
}

export function fetchPTAssumptionRequest(data) {
  return apiGet(PROVOSTASSUMPTION, data);
}

export function fetchDeanAssumptionRequest(data) {
  return apiGet(DEANASSUMPTION, data);
}

export function fetchHNNASEJAssumptionRequest(data) {
  return apiGet(HNASEJASSUMPTION, data);
}

export function fetchHNNASESAssumptionRequest(data) {
  return apiGet(HNASESASSUMPTION, data);
}

export function handleAssumptionApprove(data) {
  return apiPost(APPROVEASSUMPTION + data.id, data);
}

export function handleAssumptionDecline(data) {
  return apiPost(APPROVEASSUMPTION + data.id, data);
}


export function fetchCSRegularizationRequest(data) {
  return apiGet(CSREGULARIZED, data);
}
export function fetchHodRegularizationRequest(data) {
  return apiGet(HODREGULARIZED, data);
}
export function fetchUnitRegularizationRequest(data) {
  return apiGet(HOUREGULARIZED, data);
}
export function fetchPTRegularizationRequest(data) {
  return apiGet(PROVOSTREGULARIZED, data);
}
export function fetchDEANRegularizationRequest(data) {
  return apiGet(DEANREGULARIZED, data);
}
export function fetchHNASEJRegularizationRequest(data) {
  return apiGet(HNASEJREGULARIZED, data);
}
export function fetchHNASESRegularizationRequest(data) {
  return apiGet(HNASESREGULARIZED, data);
}
export function handleRegularizedApprove(data) {
  return apiPost(APPROVEREGULARIZED + data.id, data);
}

export function handleRegularizedDecline(data) {
  return apiPost(APPROVEREGULARIZED + data.id, data);
}

export function fetchCSConfirmation(data) {
  return apiGet(CSCONFIRMATION, data);
}
export function fetchHodConfirmation(data) {
  return apiGet(HODCONFIRMATION, data);
}
export function fetchUnitConfirmation(data) {
  return apiGet(HOUCONFIRMATION, data);
}
export function fetchPTConfirmation(data) {
  return apiGet(PROVOSTCONFIRMATION, data);
}
export function fetchDEANConfirmation(data) {
  return apiGet(DEANCONFIRMATION, data);
}
export function fetchHNASEJConfirmation(data) {
  return apiGet(HNASEJCONFIRMATION, data);
}
export function fetchHNASESConfirmation(data) {
  return apiGet(HNASESCONFIRMATION, data);
}
export function handleConfirmationApprove(data) {
  return apiPost(APPROVECONFIRMATION + data.id, data);
}

export function handleConfirmationDecline(data) {
  return apiPost(APPROVECONFIRMATION + data.id, data);
}

export function fetchCSWithdrawalRequest(data) {
  return apiGet(CSWITHDRAWAL, data);
}
export function fetchHodWithdrawalRequest(data) {
  return apiGet(HODWITHDRAWAL, data);
}
export function fetchUnitWithdrawalRequest(data) {
  return apiGet(HOUWITHDRAWAL, data);
}
export function fetchPTWithdrawalRequest(data) {
  return apiGet(PROVOSTWITHDRAWAL, data);
}
export function fetchDEANWithdrawalRequest(data) {
  return apiGet(DEANWITHDRAWAL, data);
}
export function fetchHNASEJWithdrawalRequest(data) {
  return apiGet(HNASEJRWITHDRAWAL, data);
}
export function fetchHNASESWithdrawalRequest(data) {
  return apiGet(HNASESWITHDRAWAL, data);
}
export function handleWithdrawalApprove(data) {
  return apiPost(APPROVEWITHDRAWAL + data.id, data);
}

export function handleWithdrawalDecline(data) {
  return apiPost(APPROVEWITHDRAWAL + data.id, data);
}

export function fetchCSSpadev(data) {
  return apiGet(CSSPADEV, data);
}
export function fetchHodSpadev(data) {
  return apiGet(HODSPADEV, data);
}
export function fetchUnitSpadev(data) {
  return apiGet(HOUSPADEV, data);
}
export function fetchPTSpadev(data) {
  return apiGet(PROVOSTSPADEV, data);
}
export function fetchDEANSpadev(data) {
  return apiGet(DEANSPADEV, data);
}
export function fetchHNASEJSpadev(data) {
  return apiGet(HNASEJSPADEV, data);
}
export function fetchHNASESSpadev(data) {
  return apiGet(HNASESSPADEV, data);
}
export function handleSpadevApprove(data) {
  return apiPost(APPROVESPADEV + data.id, data);
}

export function handleSpadevDecline(data) {
  return apiPost(APPROVESPADEV + data.id, data);
}

export function createJob(data) {
  return apiPost(CREATEJOB, data);
}


export function fetchJobs(data) {
  return apiGet(FETCHJOBS, data);
}