//export const API_BASE_URL = 'https://hrmdev.devapi.live/api';
export const API_BASE_URL = 'https://hrm.devapi.live/api';
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint

export const ADDUSER = getApiUrl('/staffs')
export const ADDNEWSTAFF = getApiUrl('/register-staff')
export const ADDNEWAPPLICANT = getApiUrl('/register-applicant')
export const GETUSERS = getApiUrl('/staffs')
export const DELETEUSER = getApiUrl('/staffs/')
export const GETROLE = getApiUrl('/all-roles')
export const DISPLAYALLFACULTY = getApiUrl('/all-faculties')
export const DISPLAYALLDEPARTMENT = getApiUrl('/all-departments')
export const DISPLAYALLUNIT = getApiUrl('/units')
export const DISPLAYSTAFFBYDEPARTMENT = getApiUrl('/staffs-department')
export const UPDATEPINFO = getApiUrl('/update-personal-information')
export const UPDATECINFO = getApiUrl('/update-contact-information')
export const UPDATENOK = getApiUrl('/update-next-of-kin')
export const UPDATEFINFO = getApiUrl('/update-family-details')
export const UPDATEAINFO = getApiUrl('/update-academic-details')
export const UPDATEPASSWORD = getApiUrl('/update-password')
export const RESETPASSWORD = getApiUrl('/password/forgot')
export const VERIFYOTP = getApiUrl('/password/verify')
export const CHANGEPASSWORD = getApiUrl('/password/reset')
export const GETSTAFFBYID = getApiUrl('/staffs/')
export const GETLEAVEBYID = getApiUrl('/leave/')
export const APPLYLEAVE = getApiUrl('/request-leave')
export const NOTIFICATION = getApiUrl('/my-notifications')
export const DISPLAYDEPARTMENTLEAVE = getApiUrl('/leave-department')
export const UNITLEAVE = getApiUrl('/hou-leave')
export const CSLEAVE = getApiUrl('/cs-leave')
export const PTLEAVE = getApiUrl('/provost-leave')
export const DEANLEAVE = getApiUrl('/dean-leave')
export const DEPUTYPROVOSTLEAVE = getApiUrl('/dpt-leave')
export const HNASESLEAVE = getApiUrl('/hnases-leave')
export const HNASEJLEAVE = getApiUrl('/hnasej-leave')
export const APPROVELEAVE = getApiUrl('/approve-leave/')
export const DECLINELEAVE = getApiUrl('/approve-leave/')
export const MYLEAVE = getApiUrl('/my-leave-requests')
export const APPOINTMENTAPPLICATION = getApiUrl('/certification')
export const LEAVERESUMPTION = getApiUrl('/resume-leave')
export const REGULARIZATIONAPPLICATION = getApiUrl('/regularization')
export const RESPONDHODCOMMENT = getApiUrl('/approve-or-decline/regularization')
export const APPOINTMENTCONFIRMATION = getApiUrl('/confirmation')
export const APPOINTMENTWITHDRAWAL = getApiUrl('/withdrawal')
export const MYCONFIRMATION = getApiUrl('/my-confirmations')
export const LEAVERESUMPTIONREQUEST = getApiUrl('/resume-leaves')
export const RESUMPTIONBYID = getApiUrl('/resumption/')
export const MYCONFIRMATIONBYID = getApiUrl('/confirmation/')
export const MYREGULARIZATION = getApiUrl('/my-regularizations')
export const REGULARIZATIONBYID = getApiUrl('/regularization/')
export const MYASSUMPTION = getApiUrl('/my-certifications')
export const ASSUMPTIONBYID = getApiUrl('/certification/')
export const MYWITHDRAWAL = getApiUrl('/my-withdrawal')
export const WITHDRAWALBYID = getApiUrl('/withdrawal/')
export const SPADEVBYID = getApiUrl('/spadev-applications/')
export const MYSPADEV = getApiUrl('/my-spadev-application')
export const SPADEVAPPLICATION = getApiUrl('/spadev-applications')

export const CSASSUMPTION = getApiUrl("/cs-certification");
export const DEANASSUMPTION = getApiUrl("/dean-certification");
export const PROVOSTASSUMPTION = getApiUrl("/provost-certification");
export const HOUASSUMPTION = getApiUrl("/hou-certification");
export const HODASSUMPTION = getApiUrl("/hod-certification");
export const HNASEJASSUMPTION = getApiUrl("/hnasej-certification");
export const HNASESASSUMPTION = getApiUrl("/hnases-certification");
export const APPROVEASSUMPTION = getApiUrl("/approve-certification/");

export const CSREGULARIZED = getApiUrl("/cs-regularization");
export const DEANREGULARIZED = getApiUrl("/dean-regularization");
export const PROVOSTREGULARIZED = getApiUrl("/provost-regularization");
export const HOUREGULARIZED = getApiUrl("/hou-regularization");
export const HODREGULARIZED = getApiUrl("/hod-regularization");
export const HNASEJREGULARIZED = getApiUrl("/hnasej-regularization");
export const HNASESREGULARIZED = getApiUrl("/hnases-regularization");
export const APPROVEREGULARIZED = getApiUrl("/approve-regularization/");

export const CSCONFIRMATION = getApiUrl('/cs-confirmation')
export const DEANCONFIRMATION = getApiUrl('/dean-confirmation')
export const PROVOSTCONFIRMATION = getApiUrl("/provost-confirmation");
export const HOUCONFIRMATION = getApiUrl('/hou-confirmation')
export const HODCONFIRMATION = getApiUrl('/hod-confirmation')
export const HNASEJCONFIRMATION = getApiUrl('/hnasej-confirmation')
export const HNASESCONFIRMATION = getApiUrl('/hnases-confirmation')
export const APPROVECONFIRMATION = getApiUrl('/approve-confirmation/')

export const CSWITHDRAWAL = getApiUrl('/cs-withdrawal')
export const DEANWITHDRAWAL = getApiUrl('/dean-withdrawal')
export const PROVOSTWITHDRAWAL = getApiUrl('/provost-withdrawal')
export const HOUWITHDRAWAL = getApiUrl('/hou-withdrawal')
export const HODWITHDRAWAL = getApiUrl('/hod-withdrawal')
export const HNASEJRWITHDRAWAL = getApiUrl('/hnasej-withdrawal')
export const HNASESWITHDRAWAL = getApiUrl('/hnases-withdrawal')
export const APPROVEWITHDRAWAL = getApiUrl('/approve-withdrawal/')

export const CSSPADEV = getApiUrl('/cs-spadev')
export const DEANSPADEV = getApiUrl('/dean-spadev')
export const PROVOSTSPADEV = getApiUrl('/provost-spadev')
export const HOUSPADEV = getApiUrl('/hou-spadev')
export const HODSPADEV = getApiUrl('/hod-spadev')
export const HNASEJSPADEV = getApiUrl('/hnasej-spadev')
export const HNASESSPADEV = getApiUrl('/hnases-spadev')
export const APPROVESPADEV = getApiUrl('/approve-spadev/')
export const LEAVESTATUS = getApiUrl('/leave-status')


export const CREATEJOB = getApiUrl('/jobs')
export const FETCHJOBS = getApiUrl('/all-jobs')
export const LEAVECOUNT = getApiUrl('/training-leaves-count')
export const LASTLEAVE = getApiUrl('/last-approved-leave')
export const RESUMELEAVE = getApiUrl('/resumption/duty')




export const AVAILABLESTAFF = getApiUrl('/get-available-staffs')
export const UNREADNOTIFICATION = getApiUrl('/notification-unread-count')
export const MARKASREAD = getApiUrl('/mark-all-read')
export const GETLASTLEAVE = getApiUrl('/last-approved-leave')
export const STAFFONLEAVE = getApiUrl('/user-leave-status')
export const TRACKPROGRESS = getApiUrl('/track-progress-bar')



