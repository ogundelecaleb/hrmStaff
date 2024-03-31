
export const API_BASE_URL = 'https://test.lasucom.solarcredit.io/api';
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint

export const LOGIN = getApiUrl('/login')
export const GETUSERDETAILS = getApiUrl('/user')
export const GETNOTIFICATION = getApiUrl('/my-notifications')

